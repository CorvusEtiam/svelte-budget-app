<script>
    import { format_currency, pollState } from "./globals.js";
    
    $: average_amount = Math.round(($pollState.poll.amount / $pollState.people.length) * 100) / 100;


</script>
<style>
    thead th:nth-child(1) {
        width: 2rem;
    }

    thead th:nth-child(2) {
        width: 2rem;
    }

    td > input {
        margin: 0.5rem;
    }

    

    tbody tr td:nth-child(2) {
        text-align: left;
    }
    tbody tr td:nth-child(3) {
        padding-left: 10px;
    }
    
    tbody tr td:nth-child(4) {
        justify-content: center;
        padding-left: 10px;
    }

    tbody tr td:nth-child(5) {
        justify-content: center;
        padding-left: 10px;
    }
    
    


    .paid {
        color: green;
    }

    .owe {
        color: red;
    }
</style>
<table>
    <caption>Poll named: {$pollState.poll.name} for {format_currency($pollState.poll.currency, $pollState.poll.amount)}</caption>
    <thead>
        <tr>
            <th></th>
            <th>No.</th>
            <th>Person</th>
            <th>Paid</th>
            <th>Difference</th>
        </tr>
    </thead>
    <tbody>
        {#each $pollState.people as person, index }
        <tr>
            <td><input type="checkbox" bind:value={person.selected} /></td>
            <td>{index + 1}.</td>
            <td>{person.name}</td>
            <td class = "{ person.amount > 0 ? 'paid' : 'owe' }">{ format_currency($pollState.poll.currency, person.amount) }</td>
            <td>{ format_currency($pollState.poll.currency, person.amount - average_amount) }</td>
        </tr>
        {/each}
    </tbody>
</table>
