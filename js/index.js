var SAMPLE_HOST_DATA = [
    {
        "id": "banchaz",
        "name": "banchaz"
    },
    {
        "id": "kale",
        "name": "kale"
    },
    {
        "id": "abhishek",
        "name": "abhishek"
    },
    {
        "id": "ablinux-node-v5",
        "name": "ablinux-node-v5"
    },
    {
        "id": "fresno",
        "name": "fresno"
    },
    {
        "id": "pratik",
        "name": "pratik"
    },
    {
        "id": "zebra",
        "name": "zebra"
    },
    {
        "id": "saurabh",
        "name": "saurabh"
    },
    {
        "id": "darpan",
        "name": "darpan"
    },
    {
        "id": "unmesh",
        "name": "unmesh"
    },
    {
        "id": "niki",
        "name": "niki"
    },
    {
        "id": "charisma",
        "name": "charisma"
    },
    {
        "id": "kabir",
        "name": "kabir"
    },
    {
        "id": "hasan",
        "name": "hasan"
    },
    {
        "id": "robert",
        "name": "robert"
    },
    {
        "id": "tommy",
        "name": "tommy"
    }
];

$(document).ready(function () {
    $.mockjax.clear();
    $.mockjax({
        url: '/get-hosts',
        responseTime: [250, 1500],
        responseText: SAMPLE_HOST_DATA
    });
    var dt;
  


	
	$.ajax({
        url: '/get-hosts',
        dataType: 'json',
        success: function (data) {
            data.sort(SortByName);   
			SAMPLE_HOST_DATA=data;
			dt = data.sort(SortByName);
            for (i = 0; i < 10; i++) {
                $("#mutliSelect ul").append('<li><input id="check' + [i] + '" type="checkbox" value="' + data[i].id + '" />' + data[i].name + '</li>');
            }
            //showMore(data);
        }
    });

    // Show all Content in Dropdown
    $("#show-more").on('click', function () {
        //console.log(dt);
        for (i = 10; i < dt.length; i++) {
            $("#mutliSelect ul").append('<li><input id="check' + [i] + '" type="checkbox" value="' + dt[i].id + '" />' + dt[i].name + '</li>');
        }
    });

    // Console.log Select Items.
    $(".dropdown div a").on('click', function () {
        $(".dropdown div ul").slideToggle('fast');
        for (i = 0; i < dt.length; i++) {
            console.log($("#check" + i + ":checked").val());
        }
    });

    $(".dropdown div ul li a").on('click', function () {
        $(".dropdown div ul").hide();
    });

    $('.mutliSelect input[type="checkbox"]').on('click', function () {
        $("#mutliSelect").click(function (e) {
            e.stopPropagation();
            return false;
        });
    });
});
 function SortByID(x,y) {
      return x.id - y.id; 
    }


    function SortByName(x,y) {
      return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
    }

function getSelectedValue(id) {
    return $("#" + id).find("div a span.value").html();
}

$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown")) $(".dropdown div ul").hide();
});


function filter(element) {
    var value = $(element).val();

    $("#theList > li").each(function () {
        if ($(this).text().search(value) > -1 ) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}
// Sorting Starts Here...
function assendingorder() {
    sortUnorderedList('theList', false);
    $('#theList').css('display', 'block');
    return false;
}

function desendingorder() {
    sortUnorderedList('theList', true);
    $('#theList').css('display', 'block');
    return false;
}

function sortUnorderedList(ul, sortDescending) {
    if (typeof ul == "string")
        ul = document.getElementById(ul);

    if (!ul) {
        alert("The UL object is null!");
        return;
    }

    // Get the list items and setup an array for sorting
    var lis = ul.getElementsByTagName("LI");
    var vals = [];
   // var fli = lis[0].innerHTML;
    // Populate the array
   // for (var i = 0, l = lis.length; i < l; i++) {
     //   if (i != 0)
       //     vals.push(lis[i].innerHTML);
//
   // }

SAMPLE_HOST_DATA.sort(SortByName);   
   
   // Sort it
  //  vals.sort();
    // Sometimes you gotta DESC
     if (sortDescending)
        //vals.reverse();
     SAMPLE_HOST_DATA.reverse(SortByName);
	//vals.splice(0, 0, fli);
    // Change the list on the page
   
	
	for (i = 0; i < 10; i++) {
                lis[i].innerHTML=('<input id="check' + [i] + '" type="checkbox" value="' + SAMPLE_HOST_DATA[i].id + '" />' + SAMPLE_HOST_DATA[i].name );
            }   
  // for (var i = 0, l = lis.length; i < l; i++)
     //   lis[i].innerHTML = vals[i];
}


// Add Random HOst
function addrandomHosts() {
    var newhost = getrandomhost();
    $("#mutliSelect ul").append('<li><input type="checkbox" value="' + newhost.id + '" />' + newhost.name + '</li>');
    SAMPLE_HOST_DATA.push(newhost);
}
function getrandomhost() {
    var seed = (Math.random().toString(16) + '000000000').substr(2, 8);
    return {
        id: 'random-host-' + seed
        , name: 'This is Random Host (' + seed + ')'
    };
};

// Delete Random Host
function deleteHosts() {
    $("#theList > li").each(function () {
        if ($('input[type=checkbox]', this).is(':checked') && $(this).index() > 0) {
            console.log($(this));
            $(this).remove();
        }
    });
};

function onselect() {
    $("#theList > li").each(function () {
        if ($('input[type=checkbox]', this).is(':checked') && $(this).index() > 0) {
            console.log($(this));
        }
    });
};


$('#toggle-error-mode').on('click', function () {
    Mock.toggleMode();
});
