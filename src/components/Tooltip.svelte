<script>
  import { tooltip } from '../utils/TooltipStore';
  import { fade, slide, fly } from 'svelte/transition';
  import "@fontsource/barlow/400.css";
	import "@fontsource/barlow-semi-condensed/400.css";
</script>

{#if $tooltip.visible}
  <div class="tooltip" 
      in:fade={{ duration: 225 }}
      out:fade={{ duration: 150 }}
      style:top="{$tooltip.y}px" 
      style:left="{$tooltip.x}px">

    {#if $tooltip.data?.image}
      <img src="{$tooltip.data.image}" alt="{$tooltip.data.name}" style="width: 15em; height: auto;">
    {/if}

    <div class="tooltip-content">
      {#each Object.entries($tooltip.data || {}) as [key, value]}
        {#if key !== 'image'}
          <div class="tooltip-row">
            <div class={key === 'chapterAppearances' ? 'tooltip-title-long' : 'tooltip-title'}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </div>
            <div class="tooltip-text">{value}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}


<style>
  .tooltip {
      font-family: "Barlow", sans-serif;
      position: absolute;
      pointer-events: none;
      color: white;
      background-color: rgba(34, 34, 59, 0.9);
      border: 1px solid black;
      border-radius: 0.75em;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      padding: 10px;
      max-width: 15em;
      overflow-wrap: break-word;
      z-index: 10;
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    color: white;
  }

  .tooltip-row {
    display: flex;
    align-items: flex-start;
    padding: 2px;
  }

  .tooltip-title, .tooltip-title-long {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tooltip-title {
    flex-basis: 30%;
    padding: 1px 4px;
    margin-right: 10px;
    background-color: #505f79;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 1em;
    color: #fff;
    border-radius: 4px;
    text-align: center;
  }

  .tooltip-title-long {
    flex-basis: 30%;
    padding: 1px 4px;
    margin-right: 10px;
    background-color: #505f79;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #fff;
    border-radius: 4px;
    font-size: 0.6em;
    text-align: center;
    word-wrap: break-word;
    line-height: 1.2;
    max-width: 100%;
  }

  .tooltip-text {
    flex-basis: 70%;
    font-size: 0.92em;
  }

  img {
    display: block;
    margin: auto;
    margin-bottom: 0.3em;
    border-radius: 4px;
  }
</style>