<svelte:head>
    <link rel="stylesheet" href="/css/fonts.css">
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import Tooltip from './Tooltip.svelte';
	import { tooltip } from '../utils/TooltipStore';
	import "@fontsource/barlow/400.css";
	import "@fontsource/barlow-semi-condensed/400.css";

  let data;
  const width = 1200;
  const height = 600;
  const sides = 6;
  const fixedRadius = 13;

  // function to process CSV data
  const processData = (csvData) => {
    const groupedByType = d3.group(csvData, d => d['FruitType']);
    const processedData = Array.from(groupedByType, ([type, fruits]) => ({
        fruitType: type,
        children: fruits.map(fruit => ({
            name: fruit.Fruit,
            value: 1,
            user: fruit.Name,
            ability: fruit.AbilityDescription,
            episodeCount: +fruit.EpisodeCount,
            image: fruit.ImageLink,
        }))
    }));
    return { name: "root", children: processedData };
  };

  function polygonPoints(sides, radius, centerX, centerY) {
    const angleStep = (2 * Math.PI) /sides;
    return d3.range(sides).map(i => {
      const angle = i * angleStep;
      return [
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      ];
    });
  };

  // function to create legend
  function createLegend(groupG, colorArray, labels) {
      const legendY = 230;
      const legendXStart = -85;

      // Create legend group
      const legendGroup = groupG.append('g')
                                .attr('transform', `translate(0, ${legendY})`);

      // add legend box
      // legendGroup.append('rect')
      //             .attr('x', -120)
      //             .attr('y', -20)
      //             .attr('width', 250)
      //             .attr('height', 55)
      //             .attr('fill', '#c2b5a8')
      //             // .attr('opacity', 0.7)
      //             // .attr('stroke', '#333')
      //             // .attr('stroke-width', 1)
      //             .attr('rx', '0.75em')
      //             .attr('ry', '0.75em');

      // add legend titles
      legendGroup.append('text')
                  .attr('x', 0) 
                  .attr('y', -30) 
                  .attr('text-anchor', 'middle')
                  .attr('fill', '#1a1a1a') 
                  .attr('font-size', '0.9em') 
                  .attr('font-weight', '400')
                  .attr('font-style', 'italic') 
                  .text('Chapter Appearances Range');

      colorArray.forEach((color, index) => {
          const position = legendXStart + index * 60;

          // Calculate points for hexagon
          const points = polygonPoints(sides, 10, 0, 0).map(p => `${p[0] + position},${p[1]}`).join(' ');

          // Append hexagon
          legendGroup.append('path')
                      .attr('d', `M${points}Z`)
                      .attr('fill', color);

          // Append label
          legendGroup.append('text')
                      .attr('x', position - 2)
                      .attr('y', 25)
                      .attr('text-anchor', 'middle')
                      .attr('fill', '#333')
                      .attr('font-size', '0.8em')
                      .attr('font-weight', '300')
                      .attr('font-style', 'italic')
                      .text(labels[index]);
      });
  }

  // Function to create the chart
  const createChart = (data) => {
    d3.select('#chart').selectAll("*").remove();

    // color scale
    const parameciaColors = ['#e8c2ff','#d699ff', '#7b2cbf', '#3c096c']; // purple shades
    const zoanColors = ['#f0acac', '#e77d7d', '#d93333','#9d0208']; // red shades
    const logiaColors = ['#ffc01e', '#fda772', '#fc8236', '#e85d04']; // orange shades

    // thresholds for quartiles: 1, 15, 30, 45
    const colorScale = {
      'Paramecia': d3.scaleThreshold()
                   .domain([15,30,45])
                   .range(parameciaColors),
      'Zoan': d3.scaleThreshold()
                     .domain([15,30,45])
                     .range(zoanColors),
      'Logia': d3.scaleThreshold()
                     .domain([15,30,45])
                     .range(logiaColors)
    }

    // chart generation
    const lineGenerator = d3.line();
    
    const pack = d3.pack()
                   .size([height, height])
                   .padding(5);

    const root = d3.hierarchy(data)
                   .sum(d => d.value)
                   .sort((a, b) => b.value - a.value);

    pack(root);

    // const segmentWidth = width / root.children.length;
    // const currentWidth = window.innerWidth;

    const calculatePositions = (currentWidth) => {
      // Calculate new positions based on currentWidth
      const segmentWidth = currentWidth / root.children.length;
      // Other calculations as needed
      return { segmentWidth }; // Return calculated values
    };

    const currentWidth = window.innerWidth;
    const { segmentWidth } = calculatePositions(currentWidth)

    const svg = d3.select('#chart')
                  .attr('viewBox', `0 0 ${currentWidth} ${height}`)
                  .style('background', '#f2e9e4');

    // svg.append('rect')
    //     .attr('x', 0)
    //     .attr('y', height / 6.5)
    //     .attr('width', '100%')
    //     .attr('height', '50%')
    //     .attr('fill', '#c2b5a8');

    root.children.forEach((group, index) => {
        const groupX = (segmentWidth * index) + (segmentWidth / 2);
        const groupY = height / 2.5;

        // create a group for each cluster
        const groupG = svg.append('g')
                          .attr('transform', `translate(${groupX},${groupY})`);

        // legend generation
        if (group.data.fruitType === 'Paramecia') {
            createLegend(groupG, parameciaColors, ["< 15", "15-30", "30-45", ">= 45"]);
        } else if (group.data.fruitType === 'Zoan') {
            createLegend(groupG, zoanColors, ["< 15", "15-30", "30-45", ">= 45"]);
        } else if (group.data.fruitType === 'Logia') {
            createLegend(groupG, logiaColors, ["< 15", "15-30", "30-45", ">= 45"]);
        }

        // append cluster labels
        groupG.append('text')
                .attr('x', 0)
                .attr('y', -175)
                .attr('text-anchor', 'middle')
                .attr('font-family', 'Anime Ace, monospace')
                .attr('font-size', '1.1em')
                .attr('fill', '#333')
                .text(group.data.fruitType);

        // append paths (or circles) to this group
        group.leaves().forEach(leaf => {
            const leafX = leaf.x - group.x;
            const leafY = leaf.y - group.y;
            const leafG = groupG.append('g')
                                .attr('transform', `translate(${leafX}, ${leafY})`);

            const hexagon = leafG.append('path')
                                  .attr('d', d => {
                                      const points = polygonPoints(sides, fixedRadius, 0, 0);
                                      return lineGenerator(points) + 'Z';
                                  })
                                  .attr('fill', d => {
                                      const scale = colorScale[leaf.parent.data.fruitType];
                                      return scale(leaf.data.episodeCount);
                                  });

            leafG.append('circle')
                  .attr('r', fixedRadius + 3)
                  .attr('fill', 'transparent')
                  .on("mouseover", function(event, d) {
                      hexagon.attr('stroke', '#6c757d').attr('stroke-width', 4);
                      
                      // Set the tooltip data without coordinates first
                      tooltip.set({
                          visible: true,
                          data: {
                              fruit: leaf.data.name,
                              type: leaf.parent.data.fruitType,
                              user: leaf.data.user,
                              ability: leaf.data.ability,
                              chapterAppearances: leaf.data.episodeCount,
                              image: leaf.data.image
                          }
                      });

                      // Delay the positioning to allow for dimension calculations
                      setTimeout(() => adjustTooltipPosition(event, leaf.parent.data.fruitType), 10);
                  })
                  .on("mousemove", function(event) {
                      adjustTooltipPosition(event, leaf.parent.data.fruitType);
                  })
                  .on("mouseout", function() {
                      hexagon.attr('stroke', 'none');
                      tooltip.set({ visible: false });
                  });

              function adjustTooltipPosition(event, fruitType) {
                  const svgRect = document.getElementById('chart').getBoundingClientRect();
                  const tooltipEl = document.querySelector('.tooltip');
                  const tooltipRect = tooltipEl.getBoundingClientRect();

                  let tooltipX;
                  let tooltipY = event.pageY + 10;

                  if (fruitType === 'Logia') {
                      tooltipX = event.pageX - tooltipRect.width - 10;
                  } else {
                      tooltipX = event.pageX + 10;
                      if (tooltipX + tooltipRect.width > svgRect.right) {
                          tooltipX = event.pageX - tooltipRect.width - 10;
                      }
                  }

                  if (tooltipY + tooltipRect.height > svgRect.bottom) {
                      tooltipY = event.pageY - tooltipRect.height - 10;
                  }
                  tooltip.update(t => ({...t, x: tooltipX, y: tooltipY}));
              }
        });
    });
  };

  // load and process data, then create the chart
  onMount(async () => {
    try {
      const csvData = await d3.csv('data/devil-fruit-users-image.csv');
      data = processData(csvData);
      createChart(data);
    } catch (error) {
      console.error('Error loading or processing data:', error);
    }
    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;
      createChart(data);
    });
  });
</script>

<svg id="chart"></svg>
<Tooltip />

<style>
	* {
		box-sizing: border-box;
		margin: 0;
    font-family: "Barlow Semi Condensed", sans-serif;
    font-weight: 400;
	}

  #chart {
    display: block;
    width: 100%;
    height: 600px;
    overflow: hidden;
  }
</style>