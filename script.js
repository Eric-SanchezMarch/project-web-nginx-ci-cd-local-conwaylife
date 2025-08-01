$(document).ready(function(){
    //posem el nostre codi javascript que utilitza jquery
    configurarInicio();
    $('.myicono').click(function(e){    // cuan face click a mi icono:

        $('#navbar ul').toggleClass('lista-sm');

    })
    function configurarInicio(){    // esta funcio busca comparar a trabes del enllaç principal de la web i els de inici saber on estem per subrrallar al inici.
        var urlpath = window.location.pathname;
        console.log(urlpath);
        $('nav a').each(function(){
            var href = $(this).attr('href');
            console.log(href);
            var indice = urlpath.length - href.length;
            console.log(urlpath.substring(indice));
            if(urlpath.substring(indice) === href){
                console.log('match');
                $(this).closest('li').addClass('active')
            }
        })
    }
})