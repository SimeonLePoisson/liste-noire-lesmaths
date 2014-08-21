// ==UserScript==
// @name        Liste Noire
// @namespace   https://github.com/SimeonLePoisson/liste-noire-lesmaths
// @description Ajoute un bouton afficher/masquer aux messages
// @author      Siméon
// @include     http://www.les-mathematiques.net/phorum/read.php?*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

// Liste des utilisateurs dont les messages seront masqués par défaut
var blacklist = ['christophe c', 'Fin de partie', 'FDP-HLM', 'FDP_HLM'];

var unhide_txt = '[masquer ce message]';

var toggle_style = {
	'margin-left': '0.5em',
	'font-size': '1em',
	'font-weight': 'normal',
	'visible' : 'hidden'
}

function add_toggle ($msg) {
	var $author = $('div.message-author', $msg);
	var author_text = $author.text().trim();

	var $toggle = $('<span/>', {
			html: unhide_txt,
			click: hide,
			css: toggle_style
	});
	$toggle.appendTo($author);
	
	var $body = $('div.message-body', $msg);	
	
	function hide () {
		var text_length = String($body.text().trim().length);
		var text = '[afficher ' + text_length + ' caractères]';
		$body.css('display','none');
		$toggle.html(text);
		$toggle.click(unhide);
	}
	
	function unhide () {
		$body.css('display','block');
		$toggle.html(unhide_txt);
		$toggle.click(hide);
	}

	if (blacklist.indexOf(author_text) >= 0) {
		hide();
	}
}

function correct_accents ($msg) {
	var content = $msg.html();
	content = content.replace(/&amp;/g,'&');
	$msg.html(content);
}

$(document).ready(function () {
    $('.message-body').css({'margin':'0', 'border':'0'});
    $('.generic').css({'margin':'0', 'border':'0'});
    $('.message').css({'margin':'16px', 'border': '1px solid #c0cdc0'});
    $('div.message-body').each(function (index) {correct_accents($(this))});
    $('div.message').each(function (index) {add_toggle($(this))});
});
