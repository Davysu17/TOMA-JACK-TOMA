function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({nome, preco, quantidade: 1});
    };

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} foi adicionado ao carrinho.`);
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total');
    lista.innerHTML = '';

    let total = 0;

    carrinho.forEach(item, index =>{
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.quantidade}x - R$${(item.preco * item.quantidade).toFixed(2)}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerDoCarrinho(index);

        lista.appendChild(botaoRemover)
        lista.appendChild(li);

        total +=item.preco * item.quantidade
    });

    totalElement.textContent = `total: R$${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
    } else {
        carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

function finalizarCompra() {
    alert('Parabéns (ou não)... Sua alma foi vendida. Compra finalizada em Silent Hill');
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

if (document.getElementById('lista-carrinho')) {
    exibirCarrinho();
}
