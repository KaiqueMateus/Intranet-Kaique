document.addEventListener("DOMContentLoaded", function() {
    // Define o caminho do arquivo CSV
    const csvFilePath = "./base_de_dados/lista_de_cidades-2.csv";

    // Seleciona o elemento HTML com a classe "resp_excel"
    const dataFormat = document.querySelector('.resp_excel');

    // Seleciona o elemento HTML com o ID "data-table"
    const dataTable = document.querySelector("#data-table");

    // Variável para manter o filtro atual
    let filtroAtual = "";

    // Variável para alternar cores das linhas
    let alternarCores = false;

    // Função para importar os dados do CSV e criar a tabela
    function importCSVData() {
        // Cria uma nova requisição XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Abre uma requisição GET para o arquivo CSV
        xhr.open("GET", csvFilePath, true);

        // Define uma função para lidar com a resposta da requisição
        xhr.onreadystatechange = function () {
            // Verifica se a requisição foi concluída e a resposta está pronta
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Obtém os dados CSV da resposta
                const csvData = xhr.responseText;

                // Divide os dados CSV em linhas
                const rows = csvData.split("\n");

                // Criação da tabela HTML
                const table = document.createElement("table");

                // Variável para alternar cores das linhas da tabela
                let isSalmao = false;

                // Loop para iterar pelas linhas do CSV e criar as linhas da tabela HTML
                for (let i = 0; i < rows.length; i++) {
                    const row = document.createElement("tr");

                    // Adiciona uma classe de cor à linha
                    row.classList.add(isSalmao ? "salmao" : "branco");

                    // Inverte a variável para alternar as cores na próxima linha
                    isSalmao = !isSalmao;

                    // Divide a linha CSV em células
                    const cells = rows[i].split(",");

                    // Loop para criar células de cabeçalho (TH) ou células de dados (TD)
                    for (let j = 0; j < cells.length; j++) {
                        const cell = document.createElement(i === 0 ? "th" : "td");
                        
                        // Define o conteúdo da célula com o valor do CSV
                        cell.textContent = cells[j];

                        // Se for a primeira linha, defina a largura da célula do cabeçalho
                        if (i === 0) {
                            cell.style.width = "70px"; // Defina a largura desejada aqui
                        }

                        // Adiciona a célula à linha
                        row.appendChild(cell);
                    }

                    // Adiciona a linha à tabela
                    table.appendChild(row);
                    // Após table.appendChild(row);
                    console.log("Tabela construída");

                }

                // Remove qualquer conteúdo pré-existente na div "data-table"
                dataTable.innerHTML = '';

                // Adiciona a tabela criada à div "data-table"
                dataTable.appendChild(table);

                // Esconde a tabela inicialmente
                table.style.display = "none";
            }
        };

        // Envia a requisição para buscar o arquivo CSV
        xhr.send();
    }

    // Chama a função para importar os dados do CSV quando a página carregar
    importCSVData();

    // Seleciona todos os botões de filtro na página
    const buttons = document.querySelectorAll(".filtro_container_button button");

    // Adiciona um manipulador de eventos para cada botão de filtro
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Quando um botão é clicado, atualize o filtro atual com o texto do botão
            filtroAtual = button.textContent;

            // Aplique o filtro para exibir apenas as linhas correspondentes
            aplicarFiltro();

            // Exiba a barra de pesquisa quando o botão for clicado
            exibirBarraPesquisa();
        });
    });

    // Adiciona um manipulador de eventos para alternar cores das linhas quando o botão é clicado
    document.getElementById("toggleColors").addEventListener("click", function() {
        // Inverte o valor da variável para alternar as cores
        alternarCores = !alternarCores;

        // Aplica as cores às linhas da tabela
        aplicarCores();
    });

    // Função para aplicar o filtro aos dados da tabela
    function aplicarFiltro() {
        console.log("Aplicando filtro...");
        const table = dataTable.querySelector("table");
        if (!table) return; // Sai da função se a tabela não foi criada ainda
    
        // Seleciona todas as linhas da tabela
        const rows = table.querySelectorAll("tr");
    
        // Itera pelas linhas, começando em 1 para pular o cabeçalho
        for (let i = 1; i < rows.length; i++) {
            const cell = rows[i].querySelector("td");
    
            // Verifique se o filtro atual está vazio ou se a célula contém o filtro atual
            if (cell && (filtroAtual === "" || cell.textContent.includes(filtroAtual))) {
                // Exibe a linha como "table-row"
                rows[i].style.display = "table-row";
            } else {
                // Oculta a linha
                rows[i].style.display = "none";
            }
        }
    
        // Exibe a tabela após aplicar o filtro
        table.style.display = "table";
    }
    

    // Função para alternar cores das linhas
    function aplicarCores() {
        const table = dataTable.querySelector("table");
        if (!table) return; // Sai da função se a tabela não foi criada ainda

        // Seleciona todas as linhas da tabela, exceto o cabeçalho
        const rows = table.querySelectorAll("tr:not(:first-child)");

        // Itera pelas linhas e alterna as classes .salmao e .branco
        rows.forEach(function(row) {
            if (alternarCores) {
                row.classList.remove("salmao");
                row.classList.add("branco");
            } else {
                row.classList.remove("branco");
                row.classList.add("salmao");
            }
        });
    }
    
});