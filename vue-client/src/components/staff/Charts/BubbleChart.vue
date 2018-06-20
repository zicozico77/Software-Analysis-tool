<script>
    import { Bubble } from 'vue-chartjs'

    export default {
        extends: Bubble,
        props: [
            'dataset'
        ],
        mounted () {
            const data = this.dataset.map(i=>{
                return {x:i.x,y:i.y,r:i.r};
            });
            this.renderChart({
                datasets: [
                    {
                        label: 'Result vs Submissions',
                        backgroundColor: '#42135a',
                        data: data
                    }
                ]
            }, {responsive: true, maintainAspectRatio: true})
        }
    }
</script>