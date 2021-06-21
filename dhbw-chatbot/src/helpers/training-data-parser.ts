

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

export class TrainingDataParser {

    public getQAPairsFromMarkDown(trainingDataAsMarkDown: any): QA[] {

        const qaPairs: QA[] = []

        

        return qaPairs

    }

    public getDocuments(qaPairs: QA[]): Document[] {
        const documents: Document[] = []

        for (const qaPair of qaPairs) {

            const document: Document = {
                lang: 'de',
                utterance: qaPair.q,
                intent: qaPair.q,
            }

            documents.push(document)
        }


        return documents
    }

    public getAnswers(qaPairs: QA[]): Answer[] {
        const answers: Answer[] = []

        for (const qaPair of qaPairs) {

            const answer: Answer = {
                lang: 'de',
                intent: qaPair.q,
                output: qaPair.a
            }

            answers.push(answer)
        }


        return answers
    }


}


const tP = new TrainingDataParser()

tP.getQAPairsFromFFCContent(undefined, "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/Finanzbuchhaltung.json")
    .then((result) => {

        const markdown = tP.getMarkdownFromQAPairs(result)
        console.log(markdown)
        // Deno.writeTextFile("./hello.md", markdown)
    })


