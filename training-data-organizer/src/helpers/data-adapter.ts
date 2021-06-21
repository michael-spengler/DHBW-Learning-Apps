

export interface QA {
    q: string,
    a: string
}

export interface Document {
    lang: string,
    utterance: string,
    intent: string
}

export interface Answer {
    lang: string,
    intent: string,
    output: string
}

export class DataAdapter {

    public async getQAPairsFromFFCContent(trainingDataAsFFCData?: any, ffcContentURL?: string): Promise<QA[]> {

        let trainingDataAsFFCContent
        if (ffcContentURL === undefined) {
            trainingDataAsFFCContent = trainingDataAsFFCData
        } else {
            trainingDataAsFFCContent = await (await fetch(ffcContentURL)).json()
        }

        const qaPairs: QA[] = []

        for (const d of Object.keys(trainingDataAsFFCContent.decks)) {
            console.log(Object.keys(trainingDataAsFFCContent.decks))
            for (const e of Object.keys(trainingDataAsFFCContent.decks[d].cards)) {
                const qa: QA = {
                    q: trainingDataAsFFCContent.decks[d].cards[e].q,
                    a: trainingDataAsFFCContent.decks[d].cards[e].a,
                }

                qaPairs.push(qa)
            }

        }

        return qaPairs

    }

    public getMarkdownFromQAPairs(qaPairs: QA[]): string {
        let mdString = ""

        for (const pair of qaPairs) {
            let entity =
                `### ${pair.q}  
${pair.a}  
`
            mdString =
                `${mdString}
${entity}
`
        }

        return mdString
    }

    public getQAPairsFromMarkDown(trainingDataAsMarkDown: any): QA[] {

        const qaPairs: QA[] = []

        throw new Error("method needs to be implemented")
        // return qaPairs

    }

}

