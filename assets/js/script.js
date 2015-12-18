$(document).ready(function(){
	$('#loadArticles').on('click', function(e){

		var date = $('input[name="startDate"]').val();

		e.preventDefault();

		$.ajax({
			url: '/url/' + date,
			dataType: "json",
			success : function(data){
				$.each(data.links, function(i, url){
					//clickhandler for links, pass data from places array to populate form input field
					var pTag = $('<p/>');
					var aTag = $('<a/>', {
						href : url,
						html : data.headlines[i].trim()
					});
					pTag.append(aTag);
					$('#theLinks').append(pTag);

					var locations = data.locations[i].trim();

					aTag.click(function(e) {
						e.preventDefault();
						var tit= data.headlines[i].trim();
						//preventdefault works if function works
						$('#eventTitle').val(tit);
						$('#eventDes').val(data.links[i]);
						$('#eventLoc').val(data.locations[i].trim());
					});
				});
			}
		});
	});
});