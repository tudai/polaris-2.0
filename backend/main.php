<?php


$doc = new DOMDocument();
libxml_use_internal_errors(true);

$section = $_GET['section'];

switch ($section){
	case "home": 
		$doc->loadHTMLFile("../home.html");
		break;
	case "catalog":
		$doc->loadHTMLFile("../catalog.html");
		breaK;
	case "media":
		$doc->loadHTMLFile("../media.html");
		break;
	case "contact":
		$doc->loadHTMLFile("../contact.html");
		break;
}
libxml_use_internal_errors(false);
echo $doc->saveHTML();
