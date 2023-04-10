const oabs = {
    maria: "OAB-RS 126.916",
    marcia: "OAB-RS 123.246",
    janaina: "OAB-RS 83.495",
};

const advogadas = {
    maria: "Maria Eugênia Scarton",
    marcia: "Márcia Denise Scarton",
    janaina: "Janaína Fabrin Berger",
};

const areas = {
    "Direito Civil": ["maria", "marcia", "janaina"],
    "Direito Empresarial e Bancário": ["janaina"],
    "Direito Digital": ["janaina"],
    "Direito Previdenciário": ["janaina"],
    "Direito Trabalhista": ["marcia"],
    "Direito de Família": ["maria"],
    "Direito Sucessório": ["maria"],
    "Outro assunto": ["maria", "marcia", "janaina"],
};
const containerInformacoes = document.querySelector(".informacoes");
const inputName = containerInformacoes.querySelector("input");

const containerAssuntos = document.querySelector(".assuntos");
const containerAdvogadas = document.querySelector(".advogadas");

const listaAssuntos = containerAssuntos.querySelector("ul");
const listaAdvogadas = containerAdvogadas.querySelector("ul");
const link = containerAdvogadas.querySelector("a");

let v = false;
for (const area in areas) {
    const adv = areas[area];
    const itemArea = document.createElement("li");
    itemArea.innerText = area;
    itemArea.classList.add("btn");
    itemArea.classList.add("btn-success");
    itemArea.classList.add(`gold-${v ? 2 : 3}`);
    itemArea.onclick = () => {
        link.href = `https://api.whatsapp.com/send?phone=+5555991443260&text=Olá, me chamo ${inputName.value}! Preciso de uma advogada de ${area}! Pode me dar mais informações, por favor?`;
        listaAdvogadas.innerHTML = "";
        for (const key of areas[area]) {
            const itemAdvogada = document.createElement("li");
            itemAdvogada.innerHTML = `
                        <div class="card">
                            <img class="card-img-top" src="./assets/images/${key}.png" alt="${advogadas[key]} ${oabs[key]}">
                            <div class="card-body">
                                <h5 class="card-title">${advogadas[key]}</h5>
                                <p class="card-text">${oabs[key]}</a>
                            </div>
                        </div>
                    `;
            listaAdvogadas.append(itemAdvogada);
        }
        let text = "";
        if (areas[area].length === 1) {
            text =
                "<b>A seguinte advogada irá te auxiliar, clique em conversar para ir para o WhatsApp.</b>";
        } else {
            text =
                "<b>Uma das seguintes advogadas irá te auxiliar, clique em conversar para ir para o WhatsApp.</b>";
        }
        containerAdvogadas.querySelector("p").innerHTML = text;
        containerAssuntos.style.display = "none";
        containerAdvogadas.style.display = "flex";
    };
    listaAssuntos.append(itemArea);
    v = !v;
}

function voltar() {
    containerAssuntos.style.display = "flex";
    containerAdvogadas.style.display = "none";
}

function continuar() {
    if (inputName.value.length) {
        containerInformacoes.style.display = "none";
        containerAssuntos.style.display = "flex";
    } else {
        inputName.classList.add("is-invalid");
    }
}

function nameOnKeyUp(that) {
    inputName.classList.remove("is-invalid");
    containerAssuntos.querySelector(
        "p"
    ).innerHTML = `<b>Bem vindo ${that.value}, selecione o assunto de sua questão:</b>`;
}