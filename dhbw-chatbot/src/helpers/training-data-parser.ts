

import axiod from "https://deno.land/x/axiod/mod.ts";

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

    public async getQAPairsFromMarkDown(): Promise<QA[]> {
        const urlToTrainingDataMarkdown = "https://raw.githubusercontent.com/michael-spengler/DHBW-KI/main/training-data.md"

        const qaPairs: QA[] = []

        const tdAsMarkdown = (await axiod.get(urlToTrainingDataMarkdown)).data

        const topicAreaUnits = tdAsMarkdown.split("\n## ")

        // console.log(topicAreaUnits.length)

        for (const topicAreaUnit of topicAreaUnits) {
            const informationUnits = topicAreaUnit.split("\n###")

            // console.log(`informationUnitsLength: ${informationUnits.length}`)
            if (informationUnits.length === 1) { // could be investigated why this exists...
                // console.log(JSON.stringify(informationUnits)) 
            } else {
                for (const informationUnit of informationUnits) {
                    const qaPair: QA = {
                        q: informationUnit.split('\n')[0],
                        a: informationUnit.split('\n')[1],
                    }

                    qaPairs.push(qaPair)
                }
            }
        }

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

