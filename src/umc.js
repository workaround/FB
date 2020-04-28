/*

	UPnP Media Controller
	
	Based on https://github.com/witi83/FB

*/

var UMC = function() {
	var hostname = '192.168.178.188';
	var port = 3500;
	var url = 'http://'+hostname+':'+port;
	var uuid = 'be842c47-c361-4602-8ca6-54cfc7d8db32';

	if (location.hostname != hostname || location.port != port) {
		alert('Redirecting to ' + url + '. Afterwards start this script again.');
		location = url+'/error404';
	}

	var setAVTransportURI = 'urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI';
	function setAVTransportXML(value) { return '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><CurrentURI><![CDATA['+value+']]></CurrentURI><CurrentURIMetaData></CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>'; }

	var playAVTransport = 'urn:schemas-upnp-org:service:AVTransport:1#Play';
	var playAVTransportXML = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><Speed>1</Speed></u:Play></s:Body></s:Envelope>';
	
	var con = new XMLHttpRequest();

	var body = document.body;

	document.title = 'UPnP Media Controller v0.1';

	// clean body
	while (body.hasChildNodes()) body.removeChild(body.lastChild);

	var div = document.createElement('section');
	div.style.border = '1px solid black';
	div.style.width = '200px';
	div.style.padding = '1em';
	div.style.margin = '2em';

	var ipLabel = document.createTextNode('URL address: ');
	div.appendChild(ipLabel);
	body.appendChild(div);

	var input = document.createElement('input');
	input.type = "text";
	input.style.marginRight = '5px';
	div.appendChild(input);

	var btn2 = document.createElement('button');
	var ipButtonLabel2 = document.createTextNode('Load media');
	btn2.appendChild(ipButtonLabel2);
	div.appendChild(btn2);

	var btn = document.createElement('button');
	var ipButtonLabel = document.createTextNode('Play media');
	btn.appendChild(ipButtonLabel);
	div.appendChild(btn);

	btn.addEventListener('click', function() {
		newIPAddress();
	});

	btn2.addEventListener('click', function() {
		loadIPAddress(input.value);
	});

	var send = function(action, xml) {
		con.open('POST', url + '/AVTransport/' + uuid + '/control.xml');
		con.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
		con.setRequestHeader('SOAPAction', action);
		con.send(xml);
	}

	var loadIPAddress = function(value) { send(setAVTransportURI, setAVTransportXML(value)) };
	var newIPAddress = function() { send(playAVTransport, playAVTransportXML) };

	var useless = function() { var use = 'less'; };

	return {
		start: useless,
	}

}

new UMC().start();