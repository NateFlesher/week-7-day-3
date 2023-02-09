const form = document.querySelector('#findform')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    season = document.getElementById('season').value
    round = document.getElementById('round').value
    console.log(season, round)
})

const getData = async () => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}


const create_list = (position, name, nationality, sponsor, points) => {
    const html = `<tr>
        <td>${position}</td>
        <td>${name}</td>
        <td>${nationality}</td>
        <td>${sponsor}</td>
        <td>${points}</td>
    </tr>`;
    document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
}

const load_data = async () => {

    const rangers = await getData();
    rangers.forEach(element => create_list(
        element.position,
        element.Driver.givenName + " " + element.Driver.familyName,
        element.Driver.nationality,
        element.Constructors[0].name,
        element.points
    ))
}
