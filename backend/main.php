<?php


$doc = new DOMDocument();


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

echo $doc->saveHTML();
