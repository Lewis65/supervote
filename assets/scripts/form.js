function comparePasswords(){
	var password = document.getElementsByName('password')[0].value;
	var confirm = document.getElementsByName('confirmpassword')[0].value;
	if (password !== confirm){
		showError(true);
	} else {
		showError(false);
	}
}

function showError(bool){
	if (bool){
		document.getElementsByName('password')[0].className + ' error';
		document.getElementsByName('confirmpassword')[0].className + ' error';
	} else {
		document.getElementsByName('password')[0].className.replace(' error', '');
		document.getElementsByName('confirmpassword')[0].className.replace(' error', '');
	}
}


