$(document).ready(function(){
	$('#loadArticles').on('click', function(e){

		var date = $('input[name="startDate"]').val();

		e.preventDefault();

		$.ajax({
			url: '/url/' + date,
			dataType: "json",
			success : function(data){
				console.log(data.links);
				$.each(data.links, function(i,url){
					//clickhandler for links, pass data from places array to populate form input field
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