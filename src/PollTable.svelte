<script>
    import { format_currency, pollState } from "./globals.js";
    

    function get_person_by_timestamp(ts) {
        for ( let i = 0; i < $pollState.people.length; i++ ) {
            if ( $pollState.people[i].timestamp === ts ) {
                return i;
            }
        }
    }
    
    function select_checkbox(ts) {
        let index = get_person_by_timestamp(ts);
        if ( $pollState.people[index].selected) {
            $pollState.selected_items = $pollState.selected_items - 1;
        } else {
            $pollState.selected_items = $pollState.selected_items + 1;    
        }
        $pollState.people[index].selected = !$pollState.people[index].selected;
    }

</script>
<style>
    .paid {
        color: green;
    }

    .owe {
        color: red;
    }
</style>
<table>
    <thead>
        <tr>
            <th>-</th>
            <th>No.</th>
            <th>Person</th>
            <th>Paid</th>
        </tr>
    </thead>
    <tbody>
        {#each $pollState.people as person, index }
        <tr>
            <td><input type="checkbox" on:change={ ev => select_checkbox(person.timestamp) } /></td>
            <td>{index + 1}.</td>
            <td>{person.name}</td>
            <td class = "{ person.amount > 0 ? 'paid' : 'owe' }">{ format_currency($pollState.poll.currency, person.amount) }</td>
        </tr>
        {/each}
    </tbody>
</table>
