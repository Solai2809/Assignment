document.getElementById('array-btn').addEventListener('click', fetchArr);

function fetchArr() {
    const inputElement = document.getElementById('inputArr');
    const inputArr = inputElement.value.split(',').map(Number);
    displayBricksAndWater(inputArr);
    displayOnlyWater(inputArr);
}

function createChart(xData, yData, elementId) {
    const container = document.getElementById(elementId);
    const chart = echarts.init(container);
    const options = {
        xAxis: { type: 'category', data: xData },
        yAxis: { type: 'value' },
        series: [
            { data: yData, type: 'bar' }
        ]
    };
    chart.setOption(options);
    window.addEventListener('resize', chart.resize);
}

const calculateWaterUnits = (arr) => {
    return arr.reduce((total, value) => total + (value !== '-' ? value : 0), 0);
};

function displayBricksAndWater(bricks) {
    const [firstCase, secondCase, finalCase, result] = [[], [], [], []];
    let leftMax = 0, rightMax = 0;

    bricks.forEach((element, i) => {
        if (element === 0) {
            firstCase.push(leftMax);
        } else {
            firstCase.push('-');
            leftMax = element;
        }
    });

    for (let i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i] === 0) {
            secondCase[i] = rightMax;
        } else {
            secondCase[i] = '-';
            rightMax = bricks[i];
        }
    }

    bricks.forEach((element, i) => {
        if (firstCase[i] === '-') {
            finalCase[i] = '-';
        } else {
            finalCase[i] = Math.min(firstCase[i], secondCase[i]);
        }

        result.push({
            value: element === 0 ? finalCase[i] : element,
            itemStyle: { color: element === 0 ? '#0000FF' : '#FFFF00' }
        });
    });

    createChart(bricks, result, 'chart-container');
}

function displayOnlyWater(bricks) {
    const [firstCase, secondCase, finalCase, result] = [[], [], [], []];
    let leftMax = 0, rightMax = 0;

    bricks.forEach((element, i) => {
        if (element === 0) {
            firstCase.push(leftMax);
        } else {
            firstCase.push('-');
            leftMax = element;
        }
    });

    for (let i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i] === 0) {
            secondCase[i] = rightMax;
        } else {
            secondCase[i] = '-';
            rightMax = bricks[i];
        }
    }

    bricks.forEach((element, i) => {
        if (firstCase[i] === '-') {
            finalCase[i] = '-';
        } else {
            finalCase[i] = Math.min(firstCase[i], secondCase[i]);
        }

        result.push({
            value: element === 0 ? finalCase[i] : 0,
            itemStyle: { color: element === 0 ? '#0000FF' : '#FFFF00' }
        });
    });

    createChart(bricks, result, 'chart-container1');
    document.getElementById('waterunit').textContent = `Total ${calculateWaterUnits(finalCase)} Water Units`;
}
