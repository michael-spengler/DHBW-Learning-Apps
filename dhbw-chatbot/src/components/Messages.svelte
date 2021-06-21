<script>
    import { onMount } from "svelte";
    export let messages;

    let completelyWritten = false;

    let textInProgress = "";

    onMount(async () => {
        let counter = 0;
        const intervalId = setInterval(() => {
            counter++;
            textInProgress = messages[0].text.substr(0, counter);
        }, 20);

        if (textInProgress === messages[0].text) {
            completelyWritten = true
            counter = 0
        }
    });
</script>

<div class="messageBox">
    {#each messages as message}
        {#if message.bot}
            <div class="messageByBot">
                {#if completelyWritten || message.text !== messages[0].text}
                    {message.text}
                {:else}
                    {textInProgress}
                {/if}
            </div>
        {:else}
            <div class="messageByUser">
                {message.text}
            </div>
        {/if}
    {/each}
</div>

<style>
    .messageBox {
        background-color: white;
        color: black;
        min-height: 70vh;
    }
    .messageByBot {
        padding-left: 0.2vw;
        padding-top: 2vh;
        text-align: left;
    }
    .messageByUser {
        padding-right: 0.2vw;
        padding-top: 2vh;
        text-align: right;
    }
</style>
