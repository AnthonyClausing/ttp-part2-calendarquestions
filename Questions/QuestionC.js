function countWays(n){
  let possibleJumps = [1,2,4]

  if(n === 0) return 1
  else if(n<=3) return possibleJumps[n-1]

  for(let i = 3; i<n; i++){
      possibleJumps[i] = possibleJumps[i-1] + possibleJumps[i-2] + possibleJumps[i-3]
  }

  return possibleJumps[n-1]
}
//This works because every the total number of possible jumps is a sum 
//of the different ways you can add 1 2 and 3 to get n