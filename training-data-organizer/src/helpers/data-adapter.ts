

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

    public async getQAPairsFromFFCContent(ffcContentURL: string): Promise<QA[]> {

        let trainingDataAsFFCContent
            trainingDataAsFFCContent = await (await fetch(ffcContentURL)).json()

        const qaPairs: QA[] = []

        console.log(JSON.stringify(trainingDataAsFFCContent))

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

    public getMarkdownFromQAPairs(qaPairs: QA[], headline: string): string {
        let mdString = `
## ${headline}  
`

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

