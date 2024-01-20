<svelte:head>
	<title>Cataloging the Devil Fruits of One Piece</title>
  <link rel="stylesheet" href="/css/fonts.css">
</svelte:head>

<script>
	import Visualization from "../components/Visualization.svelte";
	import "@fontsource/barlow/400.css";
	import "@fontsource/barlow-semi-condensed/400.css";
</script>

<div class="outer-container" id="top-outer-container">
	<div class="intro-container">
		<img class="logo" src="images/luffylogo.png" alt="one piece luffy smiling"/>
		<div class="title-container">
			<div class="title">
				<div class="sub-title">Endless tales of adventure</div>
				<div class="main-title">One Piece</div>
			</div>
		</div>
		<div class="intro">
			<p class="intro-text" style="margin-top: 0px;">
				<span class="anime crimson">One Piece</span> is a thrilling and expansive manga series 
					(a Japanese comic), stands as a testament to the imaginative power of 
					its creator, Eiichiro Oda. First published in 1997 and continuing to 
					captivate audiences worldwide, One Piece has become an iconic cornerstone 
					in the world of manga.
			</p>
		</div>
	</div>

	<div class="story-intro">
		<div class="story-intro-text">
			<p>The story sails with <span class="anime blue character">Monkey D. Luffy</span>,
				a young, rubber-bodied pirate with boundless enthusiasm and dreams of becoming 
				the Pirate King. His quest leads him to assemble a diverse and equally ambitious 
				crew, the <span class="anime blue character">Straw Hat Pirates</span>. Together, 
				they traverse the Grand Line, a perilous 
				and wonder-filled sea, in search of the legendary One Piece, a treasure said to 
				grant immense power and riches. Along their journey, they encounter other pirates, 
				bounty hunters, and various organizations, facing challenges that test their bonds 
				and ideals. <span class="anime blue character">Luffy's</span> unyielding spirit and sense of justice, combined with the 
				unique abilities and backgrounds of his crew, make their adventures not just 
				quests for treasure, but also battles for freedom and dreams in a world governed 
				by both whimsy and harsh realities.
			</p>
		</div>
	</div>

	<div class="divider-line"></div>

	<div class="chart-intro">
		<div class="chart-intro-text">
			<p>
				In One Piece, <span class="anime gold character">Devil Fruits</span> grant unique abilities at a high cost. 
				They're categorized into <span class="anime gold character">Logia, Paramecia, and Zoan </span>types. The visualization 
				below is my version of cataloging these fruits. Each hexagon, colored 
				based on the character's chapter appearances up until <span class="anime gold character">Chapter 1104</span>, 
				reveals more about the fruit when <span class="anime gold character">hovered over</span>. Go forth and explore this 
				vibrant world of powers and characters! <span class="anime crimson character">Beware spoilers!</span>
			</p>
		</div>
	</div>

</div>

<Visualization />

<div class="divider-line"></div>

<div class="outro">
	<div class="outro-text">
		<div class="outro-column">
			<h3 class="outro-title">Data and Inspiration</h3>
				<p>
					This visualization was born from an ongoing One Piece binge 
					spurred on by a close friend. Re-discovering all of the
					fantasical and whimsical elements of this world brought me back
					to my middle and high school days. With the success of the live
					action adaptation, it makes me happy knowing there are more fans 
					who get to experience this adventure together. Data was sourced from 
					the <a class="gold" href="https://onepiece.fandom.com/wiki/One_Piece_Wiki" target="_blank" rel="noopener noreferrer">One Piece Wikia</a>, 
					<a class="gold" href="https://www.sportskeeda.com/anime/how-many-devil-fruits-one-piece-all-205-fruits-listed" target="_blank" rel="noopener noreferrer">Sportskeeda</a>, and 
					this invaluable <a class="gold" href="https://www.reddit.com/r/OnePiece/comments/11jr9c8/character_appearances_by_chapter/" target="_blank" rel="noopener noreferrer">Reddit post</a>.
				</p>
		</div>
		<div class="outro-column">			
			<h3 class="outro-title">Learning and Special Thanks</h3>
				<p>
					This little project is another part of my little journey in learning to use 
					D3.js and Svelte for creating data visualizations. <a class="gold" href="https://www.newline.co/fullstack-d3" target="_blank" rel="noopener noreferrer">Amelia 
					Wattenberger's</a> book continues to help reinforce foundational techniques and key concepts. From there,
					I'm constantly inspired by and learning from the great works of <a class="gold" href="https://pudding.cool/" target="_blank" rel="noopener noreferrer">The Pudding</a> 
					and <a class="gold" href="https://www.visualcinnamon.com/" target="_blank" rel="noopener noreferrer">Nadieh Bremer</a>.
				</p>
		</div>
	</div>
</div>

<style>
	/* general styling */
	:global(body) {
		background-color: #f2e9e4;
		font-family: 'Barlow Semi Condensed', sans-serif;
		font-weight: 400;
		font-size: 16px;
		margin-top: 0px;
		margin-left: auto;
		margin-right: auto;
	}

	.outer-container {
		margin-left: auto;
		margin-right: auto;
		max-width: 1600px;
	}

	.anime {
		font-family: 'Anime Ace', monospace;
	}

	.character {
    font-size: 12px;
	}

	.crimson {
		color: crimson;
	}

	.blue {
		color: #2e63a4;
	}

	.gold {
		color: #a47e1b;
	}

	/* title and top */
	.intro-container {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1400px;
    width: calc(100% - 80px);
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    margin-bottom: 30px;
	}

	.logo {
		opacity: 0.15;
		position: absolute;
		top: -30px;
		left: 100px;
		z-index: -1;
		max-width: 550px;
	}

	.title-container{
		position: relative;
		width: 50%;
	}

	.title {
		padding-left: 30px;
		padding-right: 20px;
	}

	.sub-title {
		font-size: 23px;
		color: black;
		letter-spacing: 1.1px;
		padding-top: 60px;
		mix-blend-mode: multiply;
	}

	.main-title {
		font-family: 'Anime Ace', monospace;
		font-size: 50px;
		color: crimson;
		mix-blend-mode: multiply;
	}

	.intro {
		width: 46%;
		padding-top: 60px;
	}

	.intro-text {
		line-height: 1.6em;
		font-size: 18px;
		font-family: 'Barlow', sans-serif;
	}

	.story-intro {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 900px;
    width: calc(100% - 80px);
    margin-left: auto;
    margin-right: auto;
    font-family: 'Barlow', sans-serif;
    line-height: 160%;
    font-size: 15px;
    padding-bottom: 7.5px;
	}

	.chart-intro-text {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 900px;
    width: calc(100% - 80px);
    margin-left: auto;
    margin-right: auto;
    font-family: 'Barlow', sans-serif;
    line-height: 160%;
    font-size: 15px;
    padding-top: 7.5px;
		padding-bottom: 10px;
	}

	.outro-text {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		max-width: 900px;
		width: calc(100% - 80px);
		margin-left: auto;
		margin-right: auto;
		font-family: 'Barlow', sans-serif;
		line-height: 160%;
		font-size: 15px;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.outro-column {
		flex: 1;
		padding: 10px;
	}

	.divider-line {
    border-top: 1px solid rgba(175, 101, 40, 0.5);
    height: 5px;
    width: calc(100% - 80px);
    margin-left: auto;
    margin-right: auto;
	}
	
	/* media queries */
	@media screen and (max-width: 1450px) {
    .main-title {
        font-size: 46px;
    }
    .sub-title {
        font-size: 19px;
    }
	}

	@media screen and (max-width: 1050px) {
    .title-container, .intro, .outro {
        width: 100%;
    }
    .intro-container {
        width: calc(100% - 80px);
        margin-top: 0px;
        margin-bottom: 10px;
    }
    .title {
        padding-left: 0px;
    }
    .title-container {
        padding-top: 70px;
    }
    .main-title {
        font-size: 46px;
    }
    .sub-title {
        font-size: 22px;
    }
    .logo {
        top: 25px;
        left: 35%;
        width: 30%;
        max-width: 500px;
    }
    .intro {
        padding-top: 30px;
    }
	}

	@media screen and (max-width: 500px) {
    .main-title {
        font-size: 37px;
    }
    .sub-title {
        font-size: 16px;
    }
    .intro-container {
        margin-bottom: 0px;
    }
    .intro-container, .story-intro, .divider-line, .outro  {
        width: calc(100% - 20px);
    }
	}
</style>