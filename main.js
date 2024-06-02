const tb = document.querySelector('tbody')
const input = document.querySelector('input')
const p = document.querySelector('p')

function get(v) {
    const par = new URL(window.location.href).searchParams.get('d')
    
    if (par == null) {
        p.innerText = 'Empty'
        return
    }

    fetch(par)
    .then(r => r.ok ? r.json() : r.status)
    .then(r => {
        if (r === '404') {
            p.innerText = 'Empty'
            return
        }

        let tr = ''
        let Total_Income = 0
        let Total_Expenditures = 0

        for (let i = 0; i < r.length; i++) {
            let tr2 =
            `
            <tr>
                <td scope="row">${r[i][0]}</td>
                <td>${r[i][1]}</td>
                <td>${r[i][2].toLocaleString()}</td>
                <td>${r[i][3].toLocaleString()}</td>
            </tr>
            `

            if (v == null || v == '') tr += tr2
            else if (v == r[i][1]) tr += tr2

            Total_Income += r[i][2] == '' ? 0 : r[i][2]
            Total_Expenditures += r[i][3] == '' ? 0 : r[i][3]
        }

        tb.innerHTML = tr
        p.innerText = ''
        if (tr == '') p.innerText = 'Empty'

        if (v == null || v == '' && tr != '') {
            tb.innerHTML +=
            `
            <tr>
                <th scope="row" colspan="2" class="text-end">Total</th>
                <td>${Total_Income.toLocaleString()}</td>
                <td>${Total_Expenditures.toLocaleString()}</td>
            </tr>

            <tr>
                <th scope="row" colspan="2" class="text-end">Remaining Balance</th>
                <td colspan="2" class="text-center">${(Total_Income - Total_Expenditures).toLocaleString()}</td>
            </tr>
            `
        }
    })
}

get()
input.oninput = () => get(input.value)