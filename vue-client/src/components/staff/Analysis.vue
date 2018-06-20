<template>
    <b-card no-body>
        <b-tabs card>
            <b-tab title="Distribution" active>
                <div>
                    <b-card>
                        <div style="display: flex; flex-direction: row; justify-content: space-around; color: #42135A; font-size: 1.3rem; font-weight:800">
                            <div>Mean: {{resultMean}}</div>
                            <div>Median: {{resultMedian}}</div>
                            <!--<div>Mode: {{resultMode}}</div>-->
                        </div>
                        <div>
                            <bar-chart v-if="show" :labels="labels" :dataset="barData"></bar-chart>
                        </div>
                    </b-card>
                </div>
            </b-tab>
            <b-tab title="Other">
                <b-card>
                <div>
                    <bubble-chart :dataset="bubbleData" v-if="show"></bubble-chart>
                </div>
                </b-card>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import axios from 'axios';
    import BarChart from './Charts/BarChart.vue';
    import BubbleChart from './Charts/BubbleChart.vue';

    export default {
        data() {
            return {
                show: false,
                labels: null,
                barData: [],
                bubbleLabel: null,
                bubbleData: [],
                resultMean: null,
                resultMedian: null,
                resultMode: null
            }
        },
        methods: {
            mean(numbers) {
                var total = 0, i;
                for (i = 0; i < numbers.length; i += 1) {
                    total += numbers[i];
                }
                return (total / numbers.length).toFixed(2);
            },
            median(numbers) {
                // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
                var median = 0, numsLen = numbers.length;
                numbers.sort((a, b) => a - b);
                if (
                    numsLen % 2 === 0 // is even
                ) {
                    // average of two middle numbers
                    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
                } else { // is odd
                    // middle number only
                    median = numbers[(numsLen - 1) / 2];
                }

                return median;
            },
            modee(numbers) {
                var modes = [], count = [], i, number, maxIndex = 0;

                for (i = 0; i < numbers.length; i += 1) {
                    number = numbers[i];
                    count[number] = (count[number] || 0) + 1;
                    if (count[number] > maxIndex) {
                        maxIndex = count[number];
                    }
                }

                for (i in count)
                    if (count.hasOwnProperty(i)) {
                        if (count[i] === maxIndex) {
                            modes.push(Number(i));
                        }
                    }

                return modes;
            },
            processData() {
                let result = [];
                let bubbleResult = [];
                let numResult = [];
                for (let i = 0; i <= Math.ceil(this.maxMark/10); i++) {
                    result.push({label: `${i*10} - ${(i+1)*10-1}`, base: i*10, number: 0});
//                    bubbleResult.push({x: i*10, y:0, r:0});
                }

                this.data.forEach(i=>{
                    numResult.push(Number(i.Result));
                    const count = Math.floor(i.Result/10);
                    const r = bubbleResult.find(j=>{
                       if (j.x === i.Version && j.y === i.Result) {
                           j.r += 10;
                           return true;
                       }
                       return false;
                    });
                    if (!r) {
                        bubbleResult.push({x:i.Version, y:i.Result, r:10});
                    }
                    result[count].number += 1;
                });
                this.bubbleData = bubbleResult;
                this.barData = result.map(i=>{
                    return i.number;
                });
                this.labels = result.map(i=>{
                    return i.label;
                });
                this.resultMean = this.mean(numResult);
                this.resultMedian = this.median(numResult);
                this.resultMode = this.modee(numResult);
            }
        },
        watch: {
        },
        props: [
            'maxMark',
            'data'
        ],
        components: {
          BarChart,
            BubbleChart
        },
        mounted() {
            this.processData();
            setTimeout(()=>{
                this.show = true;
            }, 500)
        }
    }
</script>

<style scoped>
</style>