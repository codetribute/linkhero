/* Controllers */

var notefyApp = angular.module('notefyApp', []);

notefyApp.controller('groupCtrl', function($scope) {

  var data=[

    {'name': 'Html','tag': 'Fast justith Nexus S.',color:'green'},
    {'name': 'Css3', 'tag': 'The Nextation tablet.',color:'blue'},
    {'name': 'Template', 'tag': 'The Next, Next Genera.',color:'red'},
	{'name': 'Jq Plugin', 'tag': 'The Next, Next Gene.',color:'yellow'},
	{'name': 'Angular.js','tag': 'Fast justith Nexus S.',color:'green'},	
    {'name': 'Sample js', 'tag': 'The Nextation tablet.',color:'blue'},
    {'name': 'g', 'tag': 'The Next, Next Genera.',color:'red'},
	{'name': 'h.js', 'tag': 'The Next, Next Gene.',color:'yellow'},
	{'name': 'i', 'tag': 'The Nextation tablet.',color:'blue'},
    {'name': 'j', 'tag': 'The Next, Next Genera.',color:'red'},
    {'name': 'j', 'tag': 'The Next, Next Genera.',color:'red'}
  ];
  
var list=[];
var group=[];
var item=0;
var ii=0;

  angular.forEach(data, function(value, key){

	ii++;
	
	if(item==4){
		list.push(group);	
		group = [];
		item=1;
		group.push(value)
	}else{
		group.push(value);				
		item++;
	}

 	if(data.length == ii)
	{
		list.push(group);
	}
});
	
    $scope.groups = list;
  
});