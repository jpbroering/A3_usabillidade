

function verificaCEP(cep) {
    if (cep.length === 9 && cep.indexOf("-") == 5) {
        cep = cep.replace(/[^0-9]/g, "");
        if(cep.length === 8){
            getCEP(cep);
        } else {
            alert("Formato de CEP inválido. Exemplo: 00000-000 ou 00000000");
        }
        
        
    } else if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
        getCEP(cep);
    } else {
        alert("Formato de CEP inválido. Exemplo: 00000-000 ou 00000000");
    }

}

async function getCEP(cep) {
    try {
        var resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!resposta.ok) throw new Error('Erro ao buscar o CEP');
        var dados = await resposta.json();
        mostraCEP(dados);
    } catch (erro) {
        alert('CEP não encontrado', erro.message);
    }
}

function buscaCEP() {
    toggleButton();
    const cep = document.getElementById("inputCEP").value;
    clear();
    verificaCEP(cep);
}

function mostraCEP(dados) {
    if (dados.cep === undefined) {
        return alert('CEP não encontrado');
    }
    document.getElementById("resultados").innerText = `Resultados de: ${dados.cep}`;

    document.getElementById("infoContainer").style = "display: block";

    document.getElementById("localidade").innerText = `${dados.localidade}`;
    if(dados.logradouro !== "" && dados.complemento !== "" && dados.bairro !== ""){
        document.getElementById("logradouro").innerText = `${dados.logradouro} ${dados.complemento} - ${dados.bairro}`;
    } else if(dados.logradouro !== ""){
        document.getElementById("logradouro").innerText = `${dados.logradouro} ${dados.complemento}`;
    } else {
        document.getElementById("logradouro").innerText = "—";
    }

    document.getElementById("uf").innerText = `${dados.estado} - ${dados.uf}`;
}

function toggleButton() {
    const btn = document.getElementById("searchButton");
    btn.classList.remove("fade");
    void btn.offsetWidth;
    return btn.classList.add("fade");
}

function clear() {
    document.getElementById("infoContainer").style = "display: none";
    document.getElementById("resultados").innerText = ``;
}