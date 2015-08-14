// Генерация списка цитат
var QuoteGenerator = (function(){

		// Подключаем прослушку событий
		function _setUpListners(){
			
			$( ":mobile-pagecontainer" ).on( "pagecontainershow", _showList);
			 $('#list').on('click', '.del-link', _delQuote);
			 $('#list').on('click', '.show-link', _showQuotePage);
			
		}
		
		// Вывод динамического списка
		function _showList(){
			
			var data = '',
				url = 'quote.json', 
				quoteList = $('#list'),
				restoreQuotes = JSON.parse(localStorage.getItem('quotes'));
				$(quoteList).listview();
			$(quoteList).empty();	
				if(restoreQuotes != null) {
					$.each( restoreQuotes.quotes, function( key, val ) { // создаем елементы списка с сылками
    					var itemLink = '<a href="#" class="show-link" >'+val.title+'</a>',
			 		    refreshLink = '<a href="#" class="del-link" ></a>',
			 		    link = '<li class="quote-elem">'+ itemLink + refreshLink +'</li>';
    					$(quoteList).append(link);

     				});
					
     				$(quoteList).listview('refresh');	
     				//выводим в виде списка и перегружаем для вывода динамически созданных элементов
     			
				} else {
					
   					//$(quoteList).listview('refresh');
				}
		}
		
		function _showQuotePage(e) {
			e.preventDefault()
			var restoreQuotes = JSON.parse(localStorage.getItem('quotes')),
				quotes =  restoreQuotes.quotes, //массив цитат
				list = $('.quote-elem'),
				target = $(e.target).parent(),
				index = list.index(target),
				title,
				author,
				text;
			
				$.each(quotes, function( key, val ) {
					if (index === key ) {
						title = quotes[key].title;
     					author = quotes[key].author;
     					text = quotes[key].text;
     				}
 				});

     		_generateQuotePage(title, author, text); // динамическое создание страницы
     		
		};
     	
     	function _delQuote(e) {
     		e.preventDefault();
     		var restoreQuotes = JSON.parse(localStorage.getItem('quotes')), // достаем данные из localstorage
     			quotes =  restoreQuotes.quotes, //массив цитат
     			list = $('.quote-elem'),
				target = $(e.target).parent(),
				index = list.index(target);
			    		
     		$.each(quotes, function(key, val) {
     				if (index === key ) {
						quotes.splice(key, 1);
						target.remove();
					}
  					
			});
     		
     		localStorage.setItem('quotes', JSON.stringify(restoreQuotes)); // перезаписываем данные из localstorage
     		     		
     	};


		//генерация страницы цитаты 
		function _generateQuotePage(title, author, text){
			var quotePage = $('<div data-role="page" data-url="index.html&quotations"><div data-role="header" data-position="fixed"' 
				+ 'data-add-back-btn="true"  data-back-btn-text="back" data-back-btn-theme="a"><h1>'
				+ title + '</h1></div><div data-role="content" class="ui-content"><h3>'
				+ author + '</h3><p>' 
				+ text + '</p></div><div data-role="footer"');
		//добавляем новую страницу в контейнер 
			quotePage.appendTo($.mobile.pageContainer);	
		//переходим на созданную страницу
			$.mobile.changePage(quotePage);
		}

		
		return {
			init: function () {
				_setUpListners();
			},
			show: function() {
				_showList();
			}
		}

}());



// Добавление цитат
var QuoteAdd = (function(){
	// Создаём  объект
		var quoteList = {
			  'quotes': [],
			  'state': true
		};
		// Подключаем прослушку событий
		function _setUpListners(){
			$('#addForm').on('submit', _saveQuoteList);
		}; //Обработка нажатия на кнопку Добавить
			

		
		
		function _saveQuoteList(e) {
			e.preventDefault();

			var title = $('#quote-title').val(),
				author = $('#quote-author').val(),
				text = $('#quote-text').val(),
			// Пример того, как можно преобразовать строку, полученную с помощью метода
			// JSON.stringify() и сохранённую в localStorage обратно в объект
				restoreQuotes = JSON.parse(localStorage.getItem('quotes'));
				
			if(restoreQuotes !=null) {
				restoreQuotes.quotes.push({ 'title': title, 'author': author, 'text': text });
				// Преобразуем его в строку JSON с помощью метода JSON.stringify(),
				// затем пересохраняем его в localStorage под именем quotes
				localStorage.setItem('quotes', JSON.stringify(restoreQuotes));
			} else {
				quoteList.quotes.push({ 'title': title, 'author': author, 'text': text });
				//Не создан объект, так что преобразуем его в строку JSON с помощью метода JSON.stringify(),
				// затем сохраняем его в localStorage под именем quotes
				localStorage.setItem('quotes', JSON.stringify(quoteList));
			}
			
			//  changePage('#home');
			 $(':mobile-pagecontainer').pagecontainer('change', '#quotations');
			
		}


		return {
			init: function () {
				_setUpListners();
			}
		}

}());