<script>
  import Messages from "@/components/Messages.svelte";
  import InputArea from "@/components/InputArea.svelte";
  import { onMount } from "svelte";
  import { TrainingDataParser } from "./helpers/training-data-parser.ts";

  // import { containerBootstrap } from "@nlpjs/core"
  // import {Nlp} from "@nlpjs/nlp"
  // import {LangEn} from "@nlpjs/lang-en-min"
  // const { containerBootstrap } = require("@nlpjs/core");
  // const { Nlp } = require("@nlpjs/nlp");
  // const { LangEn } = require("@nlpjs/lang-en-min");

  const sendMessage = (textInput) => {
    const newMessages = messages;
    newMessages.push({ bot: false, text: textInput });
    messages = newMessages;

    getResponse(textInput).then((responseFromBot) => {
      newMessages.push({ bot: true, text: responseFromBot });
      messages = newMessages;
    });
  };

  let messages = [
    {
      bot: true,
      text: "Guten Tag. Du kannst mir alle Fragen rund um Dein Studium an der DHBW stellen.",
    },
  ];

  onMount(async () => {
    trainChatbot();
  });
  async function trainChatbot() {
    // console.log(JSON.stringify(fileContent));
    const trainingDataParser = new TrainingDataParser();

    const qaPairs = await trainingDataParser.getQAPairsFromMarkDown();

    console.log(qaPairs);
    const documents = trainingDataParser.getDocuments(qaPairs);

    const answers = trainingDataParser.getAnswers(qaPairs);

    (async () => {
      const container = await containerBootstrap();
      container.use(Nlp);
      container.use(LangEn);
      const nlp = container.get("nlp");
      nlp.settings.autoSave = false;
      nlp.addLanguage("de");
      // nlp.addLanguage("en");

      for (const document of documents) {
        nlp.addDocument(document.lang, document.utterance, document.intent);
      }

      for (const answer of answers) {
        nlp.addAnswer(answer.lang, answer.intent, answer.output);
      }

      await nlp.train();

      // const response = await nlp.process("de", "Was ist unter der Wirtschaftsinformatik zu verstehen?");
      const response = await nlp.process(
        "de",
        "Was sind die Aufgaben des Rechnungswesens?"
      );
      console.log(response);
    })();
  }

  async function getResponse(input) {
    const clientId = "1624142232599";
    const botRequestURL = `http://localhost:3010/process/input/${input}/languageCode/en/clientId/${clientId}`;
    console.log(`getting the answer from ${botRequestURL}`);
    const r = await (await fetch(botRequestURL)).json();

    return r.nlpResult.answer;
  }
</script>

<div class="basicScheme">
  <div class="contentArea">
    <Messages bind:messages />

    <InputArea {sendMessage} />
  </div>
</div>

<style>
  .contentArea {
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10vh;
  }
  .basicScheme {
    background-color: black;
    min-height: 100vh;
    min-width: 100vw;
  }
</style>
