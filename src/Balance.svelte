<script>
    import { pollState, format_currency } from "./globals.js";

    $: average_amount = ($pollState.poll.amount / $pollState.people.length);

    function compute_owed_money() {
        let acc = 0;
        for ( let i = 0; i < $pollState.people.length; i++ ) {
            let diff = (average_amount - $pollState.people[i].amount);
            if ( diff > 0 ) {
                acc += diff 
            }
        }

        return acc;
    }

    let currency = $pollState.poll.currency;
</script>
<style>
    thead th:nth-child(1) {
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

</style>

<div>
    <h2>Poll Table Balance</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Person</th>
                <th>Paid</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>
            {#each $pollState.people as person, index }
            <tr>
                <td>{index + 1}.</td>
                <td>{person.name}</td>
                <td>{ format_currency(currency, person.amount) }</td>
                <td>{ format_currency(currency, person.amount - average_amount ) }</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
<div>
    <h2>Summary</h2>
    <div>
        <h3>Person Polling money</h3>
        <p>{ $pollState.people.length }</p>    
    </div>
    <div>
        <h3>Average amount per person</h3>
        <p>{ format_currency($pollState.poll.currency, average_amount) }</p>    
    </div>
    <div>
        <h3>Money owed to other person</h3>
        <p>{ format_currency($pollState.poll.currency, compute_owed_money()) }</p>
    </div>
</div>