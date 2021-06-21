<script>
    let userInput = "";

    export let sendMessage = () => {};

    export let readyForInput
    
    function handleMessage() {
        if (readyForInput) {
            sendMessage(userInput)
            userInput=""
        } else {
            alert("Please send this message once more :)")
        }
    }
    
</script>

<div class="inputArea">
    <!-- svelte-ignore a11y-autofocus -->
    {#if readyForInput}
    <input
        bind:value={userInput}
        on:keyup={e=>e.key==='Enter' && handleMessage(userInput)}
        type="text"
        name=""
        id=""
        style="width: 70vw"
        placeholder="Enter your question here..."
        autofocus
    />

    <button
        on:click={() => handleMessage()}>Send</button
    >
{:else}
<div id="wait">
    Please wait about 10 seconds until I trained with the latest <a href="https://github.com/michael-spengler/DHBW-Learning-Apps/blob/main/training-data.md" target="_blank">training data</a>.
</div>
{/if}
</div>

<style>
    .inputArea {
        position: absolute;
        bottom: 11px;
    }

    button {
        width: 15vw;
        font-weight: bolder;
    }

    #wait {
        color: white
    }
</style>
