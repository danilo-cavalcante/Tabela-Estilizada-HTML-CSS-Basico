function calcularTabela(jogos) {
    let tabela = {};

    function atualizarTabela(jogo) {
        const { time1, gols1, time2, gols2 } = jogo;

        tabela[time1] = tabela[time1] || { pontos: 0, saldoGols: 0, golsMarcados: 0, golsSofridos: 0, vitorias: 0, empates: 0, derrotas: 0 };
        tabela[time2] = tabela[time2] || { pontos: 0, saldoGols: 0, golsMarcados: 0, golsSofridos: 0, vitorias: 0, empates: 0, derrotas: 0 };

        tabela[time1].golsMarcados += gols1;
        tabela[time1].golsSofridos += gols2;
        tabela[time2].golsMarcados += gols2;
        tabela[time2].golsSofridos += gols1;

        if (gols1 > gols2) {
            tabela[time1].pontos += 3;
            tabela[time1].vitorias += 1;
            tabela[time2].derrotas += 1;
        } else if (gols1 < gols2) {
            tabela[time2].pontos += 3;
            tabela[time2].vitorias += 1;
            tabela[time1].derrotas += 1;
        } else if (gols1 === gols2) {
            tabela[time1].pontos += 1;
            tabela[time2].pontos += 1;
            tabela[time1].empates += 1;
            tabela[time2].empates += 1;
        }

        tabela[time1].saldoGols = tabela[time1].golsMarcados - tabela[time1].golsSofridos;
        tabela[time2].saldoGols = tabela[time2].golsMarcados - tabela[time2].golsSofridos;
    }

    jogos.forEach(atualizarTabela);

    return tabela;

}

let grupo = 'A'

function exibirTabela(tabela) {
    const equipesOrdenadas = Object.keys(tabela).sort((a, b) => {

        if (tabela[b].pontos !== tabela[a].pontos) {
            return tabela[b].pontos - tabela[a].pontos
        }
        else if (tabela[b].pontos === tabela[a].pontos) {
            return tabela[b].saldoGols - tabela[a].saldoGols
        }
    });

    const tableBody = document.getElementById('tabela')

    tableBody.innerHTML += '<tbody>'
    tableBody.innerHTML += `<tr><th>Grupo ${grupo}</th><th>Pontos</th><th>Saldo de Gols</th><th>Gols Marcados</th><th>Gols Sofridos</th><th>Vitórias</th><th>Empates</th><th>Derrotas</th></tr>`;

    equipesOrdenadas.forEach((time) => {
        const { pontos, saldoGols, golsMarcados, golsSofridos, vitorias, empates, derrotas } = tabela[time];
        tableBody.innerHTML += `<tr><td>${time}</td><td>${pontos}</td><td>${saldoGols}</td><td>${golsMarcados}</td><td>${golsSofridos}</td><td>${vitorias}</td><td>${empates}</td><td>${derrotas}</td></tr>`;
    });

    tableBody.innerHTML += '</tbody>';

}
