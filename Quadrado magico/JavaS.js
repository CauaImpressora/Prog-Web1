const ordem = 3;
const matriz = Array(ordem);
for (let i=0; i<matriz.length; i++){
    matriz[i] = Array(ordem);
}

document.addEventListener('DOMContentLoaded', () =>{
    insereTabela(ordem);
});
function insereTabela(ordem){
    const tabela = document.createElement ('table');
    tabela.id = 'quadradomagico';
    document.body.append(tabela);
    for(let i=0; i<ordem; i++){
        const linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j<ordem; j++){
            const celula = document.createElement('td');
            linha.append(celula);
            celula.id = `lin${i}col${j}`;
            insereInput(celula);
        }
    }
}

function getLinhaColuna(celula){
    const [linha, coluna]= celula.if.split('col');
    return [linha.split ('lin') [1], coluna];
}

function insereInput (celula){
    const input = document.createElement('input');
    celula.append(input);
    input.addEventListener('change', () => {
        const valor = parseInt(input.value);
        const[linha, coluna] = getLinhaColuna(celula);
        alert(`${linha},${coluna}`);
        matriz[linha][coluna] = valor;
        const quadradoCompleto = verificaMatriz();
    });
}

function verificaMatriz(){
    // se não há números repetidos
    const numerosRepetidos = verificaNumerosRepetidos ();
    // se não há númeors fora dos limites
    // todas as somas estão corretas
    return !numerosRepetidos;
}

function verificaNumerosRepetidos(){
    const numeros = Array(ordem**2).fill(0);
    let numerosRepetidos = false;
    for (let i=0; i<ordem; i++){
        for(let j=0; j<ordem; j++){
            const valor = matriz[i][j];
            if (!isNaN(valor)) {
                numeros[valor-1]++;
            }
        }
    }
    for (let i=0; i<ordem; i++){
        for(let j=0; j<ordem; j++){
            const valor = matriz[i][j];
            const celula = document.querySelector(`#lin${i}col${j}`);
            if (!isNaN(valor) && numeros[valor-1] >1) {
                numerosRepetidos = true;
                celula.classList.add('numerosrepetidos');
            } else{
                celula.classList.remove('numerosrepetidos');
            }
        }
    }
    return numerosRepetidos;
}