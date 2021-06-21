<script>

    import { DataAdapter } from "../helpers/data-adapter.ts"
  
    let userInput = "";
    let markdown = ""

    const dataSourceLinks = [
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/Finanzbuchhaltung.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/IT-Security.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/IT-Sicherheit-II.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/ITIL.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/business-intelligence.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/einfuehrung-in-die-wirtschaftsinformatik.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/finanzierung-und-investition.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/kommunikationssysteme.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/personalmanagement.json",
    "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/unternehmensfuehrung.json"
]

    const tP = new DataAdapter();

    async function convert(userInput) {
      const qAPairsFromFFCContent = await tP.getQAPairsFromFFCContent(userInput)
      const headline = userInput.split("/main/")[1].split(".json")[0].replace("/", " ")
      return tP.getMarkdownFromQAPairs(qAPairsFromFFCContent, headline);
    }

    async function handleInput(userInput) {
      markdown = await convert(userInput)
    }

    async function convertAll() {

      for (const dataSourceLink of dataSourceLinks) {
        markdown = `${markdown}${await convert(dataSourceLink)}`
      }
    }
</script>

<p>
  Enter a link to an ffc deck file here - e.g.
  "https://raw.githubusercontent.com/fancy-flashcard/deck-collection/main/wirtschaftsinformatik/Finanzbuchhaltung.json"
</p>
<p />
<!-- svelte-ignore a11y-autofocus -->
<input
  bind:value={userInput}
  on:keyup={(e) => e.key === "Enter" && handleInput(userInput)}
  type="text"
  name=""
  id=""
  autofocus
/>

<button on:click={() => handleInput(userInput)}>Convert Specific File </button>
<p />

<button on:click={() => convertAll()}>Convert Data From All Sources </button>
<p />
<textarea bind:value={markdown} name="" id="" cols="30" rows="10" />

<style>
  input {
    min-width: 100%;
  }
  textarea {
    min-width: 100%;
    min-height: 80%;
  }
</style>
