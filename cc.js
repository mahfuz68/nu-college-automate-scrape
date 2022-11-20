let count = 0;
const testForLoop = function () {
    for (let i = 0; i < 10; i++) {
        
        console.log(i)
    }
}

const testForInLoop = function() {
    let count = 0;
    const elements = Array(10).fill(true)
    for (const element of elements) {
        console.log(element)
    }
}

testForInLoop()