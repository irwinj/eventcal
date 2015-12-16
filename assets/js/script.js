$(document).ready(function(){
	$('#loadArticles').on('click', function(e){
		e.preventDefault();

		$.ajax({
			url: '/url',
			dataType: "json",
			success : function(data){
				console.log(data.links);
				$.each(data.links, function(i,url){
					var pTag = $('<p/>');
					var aTag = $('<a/>', {
						href : url,
						html : data.headlines[i]
					});
					pTag.append(aTag);
					$('#theLinks').append(pTag);
				});
			}
		});
	});
});