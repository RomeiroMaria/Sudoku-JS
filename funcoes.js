let saida = [
    [[0,0,0,0,9,0,0,1,0],[1,6,0,0,0,0,7,8,0],[0,5,7,0,0,0,4,0,0],[0,0,0,7,1,4,0,0,0],[3,0,0,0,0,0,0,0,6],[0,0,0,3,6,8,0,0,0],[0,0,9,0,0,0,8,2,0],[0,8,6,0,0,0,0,4,7],[0,7,0,0,3,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0],[3,2,0,0,0,6,7,8,0],[8,0,7,2,4,0,0,5,0],[4,3,0,0,0,2,1,0,0],[0,0,0,0,0,0,0,0,0],[0,0,8,4,0,0,0,6,7],[0,5,0,0,1,3,9,0,6],[0,4,3,6,0,0,0,2,8],[0,0,0,0,0,0,0,0,0]],
    [[0,0,5,2,0,8,9,0,0],[0,2,0,6,7,0,0,5,0],[0,3,0,0,0,0,0,7,0],[4,0,0,0,0,0,0,6,8],[0,1,0,8,0,4,0,2,0],[8,6,0,0,0,0,0,0,1],[0,9,0,0,0,0,0,4,0],[0,8,0,0,4,2,0,9,0],[0,0,3,1,0,9,2,0,0]],
    [[0,0,0,1,0,0,8,0,0],[0,1,0,6,5,4,0,2,0],[9,0,2,0,0,0,5,0,0],[0,6,0,0,0,0,0,8,7],[0,9,0,0,4,0,0,1,0],[5,7,0,0,0,0,0,3,0],[0,0,3,0,0,0,1,0,6],[0,5,0,7,8,6,0,4,0],[0,0,6,0,0,9,0,0,0]],
    [[0,0,0,0,0,4,3,9,0],[1,6,0,0,0,3,8,7,0],[9,5,0,0,0,0,0,0,0],[5,3,0,4,0,9,0,0,0],[0,0,0,0,5,0,0,0,0],[0,0,0,1,0,8,0,2,6],[0,0,0,0,0,0,0,8,4],[0,4,7,3,0,0,0,5,9],[0,9,2,6,0,0,0,0,0]]
]

let num = (min,max) => Math.floor(Math.random() *(max - min)+ min);
let click = num(0,5);
let sudoku_inicial = saida[click];
let tab_limpa = $('tbody').html();
let alerta = $('#alerta_jogada').text();
let botao = $('button')[0];
let class1 = $('tbody')[0];

$('.abas').hide();
$('table').hide();
$('#bt_zerar').hide();
$('#bt_outro').hide();
$('#parabens').hide();

class1.onkeyup = function(e){
    let entrada  = e.key //pega o valor
    let linha = $(e.path[2])[0].className//class objeto clicado 
    let coluna = $(e.path[1])[0].className//propriedade '0' atributo Classname
    verificador_de_erro = verifica(linha,coluna,entrada)
  
    if( entrada == '1' || entrada == '2' || entrada == '3' || entrada == '4' || entrada == '5' || entrada == '6' || entrada == '7' || entrada == '8' || entrada == '9' || entrada == 'Backspace' ){
        
        $('#alerta_jogada').text(alerta)
        $(e.target).css('background-color','#C8E6C9')
        sudoku_inicial[linha][coluna] = parseInt(entrada);
        completo(verificador_de_erro,linha,coluna,entrada)
    }

    if(verificador_de_erro == 1){
        $('#alerta_jogada').text('Jogada inválida')
        $(e.target).css('background-color','red')

    }
}
botao.onclick = function(){//botão inicial

$('#bt_zerar').show()
$('#bt_outro').show()
$('table').show()
$('#bt_inicio').hide()
$('section').eq(3).addClass('tab')//formatação

let aux = 0
    for (let x in sudoku_inicial){
        for (let y in sudoku_inicial[x]) {
            if(sudoku_inicial[x][y] != 0 ){
                $('td').eq(aux).text((sudoku_inicial[x][y]))
            } 
            aux++
        }
    } 
}
function verifica(numlinha,numcoluna,entrada) {
    let resp = 0;
    let ll = 0;//localiza linha
    let lc = 0; //localiza coluna

    for(let i = 0 ; i < 9; i++){
        if(sudoku_inicial[i][numcoluna]== entrada){
            resp= 1
            console.log('coluna');
        }//verifica coluna
    }
    for (let i of sudoku_inicial[numlinha]) {//for ... of
        if (i == entrada ) {
            resp= 1
            console.log('linha');
        }//verifica linha
    }

    if(numlinha < 3){ 
        ll= 0;
        lc= 0; //primeiro   
        if(numcoluna > 2){
            ll= 0;
            lc= 3;//segundo
            if(numcoluna > 5){
                ll= 0;
                lc= 6;    
            }  //terceiro
        }
    }else if(numlinha < 6){
        ll= 3;
        lc= 0;//quarto
        if(numcoluna > 2){
            ll= 3;
            lc= 3;//quinto
            if(numcoluna > 5){
                ll= 3;
                lc= 6;
            }//sexto
        }
    }else{
        ll= 6;
        lc= 0;//setimo
        if(numcoluna > 2){
            ll= 6;
            lc= 3;//oitavo
            if(numcoluna > 5){
                ll= 6;
                lc= 6;
            }//nono
        }
    }
    for(let i = ll; i < (ll+3); i++){
        for(let j = lc ; j < (lc+3); j++){
            if(sudoku_inicial[i][j] == entrada){
                resp= 1
                console.log('conjunto');
            }//verifica grupo
        }
    }
       return resp; 
}
function completo(erro,linha,coluna,entrada) {
    let cont = 0;
    if (erro == 1 || entrada == 'Backspace') {
        sudoku_inicial[linha][coluna] = 0;
    }

    for (let i in sudoku_inicial) {
        for (let x  in sudoku_inicial[i]) {
            if (sudoku_inicial[i][x] != 0){
                cont++      
            }
        }
    }
    //cont = 81
    if (cont == 81){
        $('table').hide()
        $('#bt_zerar').hide()
        $('img').eq(2).attr('src','parabens.gif')
        $('#msg_parabens').text('Parabens!!!!')
        $('#parabens').show()
        //console.log('Parabéns Sudoku completo') 
    }
}  
//limpar alterações na tabela
$('button').eq(1).on('click',function(){
    $('tbody').html($('tbody').html())
})
//nova grade sudoku
$('button').eq(2).on('click',function(){
    $('#parabens').hide()
    $('#bt_zerar').show()

    click++
    $('tbody').html(tab_limpa)
    if(click > 4){
        click = 0;
    }
    sudoku_inicial = saida[click]
    botao.onclick()

})
$('a').eq(0).on('click',function(){
    $('.abas').hide();
    $('#pag_apresenta').show();
    $('#elemen_jogo').show();
    
});
$('a').eq(1).on('click',function(){
    $('.abas').hide();
    $('#pag_apresenta').hide();
    $('#elemen_jogo').hide(); 
    $('#pag_regra').show();     
});
$('a').eq(2).on('click',function(){
    $('#pag_apresenta').hide();
    $('.abas').hide();
    $('#elemen_jogo').hide();
    $('#pag_autora').show();
   // $('a').eq(2).addClass('.tamanho_pag');
     
});