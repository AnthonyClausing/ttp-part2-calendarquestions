//Only real problem with this solution is that depending on how string s looks,
//I won't have letters in the order theyre given since in the first loop everything gets grouped together


function sortByStrings(s,t){
  let sortedString = '';
  let sObject = {};
  
  //Make a dictionary/object where the letter from s is the key and the number of times it appears in the string is the value
  
  for(let i = 0; i < s.length;i++){
  	let letter = s[i]
  	sObject[letter] ? sObject[letter]++ : sObject[letter] = 1;
  }
  
  //for the letters of t if that letter is a key of the previously created s-object then combine that letter repeated by the number of times it appears in s with the returned sortedString variable
  
  for(let i=0;i<t.length;i++){
  	let letter = t[i]
  	sortedString += sObject[letter] ? letter.repeat(sObject[letter]) : '';
  }
  
  //From the keys of the sObject the remaining letters will include any letter that doesnt appear in the returned sortedString variable first changed above
	for(let letter in sObject){
		sortedString += sortedString.indexOf(letter) === -1 ? letter.repeat(sObject[letter]) : '';
	}
  return sortedString
}