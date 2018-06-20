<script>
    import { Bar } from 'vue-chartjs'

    export default {
        extends: Bar,
        mounted () {
            // Overwriting base render method with actual data.
            this.renderChart({
                labels: this.labels,
                datasets: [
                    {
                        label: 'Result Distribution',
                        backgroundColor: '#42135a',
                        data: this.dataset
                    }
                ]
            }, {responsive: true, maintainAspectRatio: true})
        },
        props: [
            'labels',
            'dataset'
        ]
    }
</script>