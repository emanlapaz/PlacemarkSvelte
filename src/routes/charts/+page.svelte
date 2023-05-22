<script>
    import TitleBar from "$lib/TitleBar.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import Chart from "svelte-frappe-charts";

    let data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: [
            {
                values: [10, 12, 3, 9, 8, 15, 9]
            }
        ]
    };
</script>

<div class="columns is-vcentered">
    <div class="column is-half">
        <TitleBar subTitle={"Contribution Analytics"} title={"Placemark Community"} />
    </div>
    <div class="column">
        <MainNavigator />
    </div>
</div>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Contributionsto date</h1>
        <Chart {data} type="line" />
    </div>
    <div class="column has-text-centered">
        <img alt="globe" src="/globe.jpeg" width="300" />
    </div>
</div>
