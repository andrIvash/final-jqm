$(document).ready(function(){	
	QuoteGenerator.init();
	//QuoteGenerator.show();
	QuoteAdd.init();
	
});


// var appCache = window.applicationCache;

// switch (appCache.status) {
//   case appCache.UNCACHED: // UNCACHED == 0
//     return 'UNCACHED';
//     break;
//   case appCache.CHECKING: // CHECKING == 2
//     return 'CHECKING';
//     break;
//   case appCache.DOWNLOADING: // DOWNLOADING == 3
//     return 'DOWNLOADING';
//     break;
//   case appCache.UPDATEREADY:  // UPDATEREADY == 4
//     return 'UPDATEREADY';
//     break;
//   case appCache.OBSOLETE: // OBSOLETE == 5
//     return 'OBSOLETE';
//     break;
//   default:
//     return 'UKNOWN CACHE STATUS';
//     break;
// };





// var appCache = window.applicationCache;
// appCache.update(); 
//Обновление кэша пользователя 
//(для этого необходимо, чтобы файл манифеста изменился). 
//После того как атрибут applicationCache.status перейдет в состояние UPDATEREADY



// if (appCache.status == window.applicationCache.UPDATEREADY) {
//   appCache.swapCache();  
  // Заменяет старый кэш на новый. 
  // Т.е. при последующем открытии будут скачены новые данные
// }