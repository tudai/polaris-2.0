<?php


$doc = new DOMDocument();

$section = $_GET['section'];

switch ($section){
	case "home":
		$doc->loadHTMLFile("../home.html", LIBXML_NOERROR);
		break;
	case "catalog":
		$doc->loadHTMLFile("../catalog.html", LIBXML_NOERROR);
		breaK;
	case "media":
		$doc->loadHTMLFile("../media.html", LIBXML_NOERROR);
		break;
	case "contact":
		$doc->loadHTMLFile("../contact.html", LIBXML_NOERROR);
		break;
}
echo $doc->saveHTML();
