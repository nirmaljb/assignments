let counter = 1
function solve() {
    console.log(counter);
    counter++
    setTimeout(solve, 1000)
}

solve()