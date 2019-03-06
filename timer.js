$("document").ready(() => {
    
    // TIMER OBJECT
    let timer = {
        mode: 0,
        st: 0,
        ct: 0,
        i: 0,
        setSt: () => {
            timer.st = Date.now();
        },
        int: () => {
            let d = Date.now() - timer.st;
            let t = (Math.floor(d / 1000));
            console.log(t);
            timer.ct = t;
            let countDown =  timer.mode - t;
            $(".timer").html("<h2>" + timer.format(countDown) + "</h2>");
            timer.checker();
        },
        run: () => {
            timer.setSt();
            timer.i = setInterval(timer.int, 1000);
        },
        format: (num) => {
            if(num < 10){
                return "0:0" + num;
            }
            else if(num < 60){
                return "0:" + num;
            }
            
            else if(num > 60){
                let n = Math.floor(num / 60);
                let s = num % 60;
                if(s < 10){
                    return n + ":0" + s;
                }
                else{
                    return n + ":" + s;
                }
            }
            else{
                return (num / 60) + ":00";
            }
        },
        checker: () => {
            console.log("TIMER MODE: " + timer.mode + "      TIMER CT: " + timer.ct);
            if(timer.mode == timer.ct){
                game.incorrect++;
                timer.clear();
                
            }
        },
        clear: () => {
            clearInterval(timer.i);
            timer.st = 0;
            timer.ct = 0;
            game.next();
        },
        // counter: {
        //     c: 0,
        //     go: () => {
        //         timer.counter.c++;
        //         let countDown =  timer.mode - timer.counter.c;
        //         $(".timer").html("<h1>" + timer.format(countDown) + "</h1>");
        //         timer.timechecker();
        //     },
        // },
    };

    //SOUND OBJECT
    // let audio = {
    //     create: () => {

    //     },
    // };

    //QUESTION OBJECT
    let q = {
        cap: {
            question: "Which Superhero carries an indestructible shield?",
            answer: "Captain America",
            choices: {
                a: "The Green Lantern",
                b: "Captain America",
                c: "Captain Flag",
                d: "The Red Tornado",
            },
        },
        spidy: {
            question: "Which superhero is associated with the phrase, 'With great power there must also come great responsibility'?",
            answer: "Spiderman",
            choices: {
                a: "Spiderman",
                b: "Hell Boy",
                c: "Batman",
                d: "The Hulk",
            },
        },
        ddevil: {
            question: "Which superhero is dubbed the 'Man without Fear'?",
            answer: "Daredevil",
            choices: {
                a: "Daredevil",
                b: "The Flash",
                c: "Wolverine",
                d: "Green Lantern",
            },
        },
        beast: {
            question: "Which superhero is the medical doctor for the X-men?",
            answer: "The Beast",
            choices: {
                a: "Storm",
                b: "Shadowcat",
                c: "Ice Man",
                d: "The Beast",
            },
        },
        storm: {
            question: "Which superhero can manipulate the weather?",
            answer: "Strom",
            choices: {
                a: "The Tornado",
                b: "The Atom",
                c: "Strom",
                d: "The Thing",
            },
        },
        cap1: {
            question: " Which superhero was given a special serum to help the war effort?",
            answer: "Captain America",
            choices: {
                a: "Spiderman",
                b: "Captain America",
                c: "The Hulk",
                d: "Wolfman",
            },
        },
        thing: {
            question: "Which Superhero's tagline is 'It's clobbering time'?",
            answer: "The Thing",
            choices: {
                a: "Iron Man",
                b: "Plastic Man",
                c: "The Green Lantern",
                d: "The Thing",
            },
        },
        hawk: {
            question: "Which superhero is also known as Ronin and Goliath?",
            answer: "Hawkeye",
            choices: {
                a: "Cyclops",
                b: "Iron Man",
                c: "Hawkeye",
                d: "The Beast",
            },
        },
        flash: {
            question: "Which superhero is nicknamed the 'Scarlett Speedster'?",
            answer: "The Flash",
            choices: {
                a: "The Flash",
                b: "Speedball",
                c: "Stardust",
                d: "The Thing",
            },
        },
        pi: {
            question: "Which Island does Wonder Woman call home?",
            answer: "Paradise Island",
            choices: {
                a: "Emerald Island",
                b: "Paradise Island",
                c: "Amazonia",
                d: "Eden Isle",
            },
        },
        qArray: () => {
            return [q.cap, q.spidy, q.ddevil, q.beast, q.storm, q.cap1, q.thing, q.hawk, q.flash, q.pi];
        },
        tArray: [],
        current: 0, 
        num: 0,
        setArray: () => {
            q.tArray = q.qArray();
            console.log(q.tArray);
        },
        RQG: () => {
            let rando = Math.floor(Math.random()*q.tArray.length);
            q.current = q.tArray[rando];
            q.num++;
            console.log(q.current);
            if(q.num !== 10){
                q.tArray.splice(rando, 1);
            }
            q.display();
            //console.log(q.tArray);
        },
        display: () => {
            if(q.tArray.length > 0){
                game.percent();
                timer.run();
                $('.questions').html('<h4>' + q.current.question + '</h4>');
                $('#a').text(q.current.choices.a);
                $('#b').text(q.current.choices.b);
                $('#c').text(q.current.choices.c);
                $('#d').text(q.current.choices.d);
            }
            else{
              game.result();
            }
        },
        
    };

    //GAME OBJECT
    let game = {
        correct: 0,
        incorrect: 0,
        result: () => {
            $('.game').fadeOut(500);
            $('.mode').fadeOut(500);
            setTimeout(() => {
                $('.end').fadeIn(1000).css('display', 'grid');
                $('.correct').html('<h4> Correct Answers<br>' + game.correct + '</h4>');
                $('.playAgain').html('Play Again?');
                $('.incorrect').html('<h4> Incorrect Answers<br>' + game.incorrect + '</h4>');
                $('.playAgain').on('click', game.reset);
            }, 800);

        },
        start: () => {
            $(".mode").fadeOut(400);
            setTimeout(() => {
                $(".game").fadeIn(1000).css('display', 'grid');
                timer.run();
                q.setArray();
                q.RQG();
                q.display();
            }, 500);

        },
        aChecker: () => {
            $('#a').on('click', () => {
                if(q.current.choices.a === q.current.answer){
                    game.correct++;
                }
                else{
                    game.incorrect++;
                }
                game.next();
            });  
            $('#b').on('click', () => {
                if(q.current.choices.b === q.current.answer){
                    game.correct++;
                }
                else{
                    game.incorrect++;
                }
                game.next();
            });
            $('#c').on('click', () => {
                if(q.current.choices.c === q.current.answer){
                    game.correct++;
                }
                else{
                    game.incorrect++;
                }
                game.next();
            });
            $('#d').on('click', () => {
                if(q.current.choices.d === q.current.answer){
                    game.correct++;
                }
                else{
                    game.incorrect++;
                }
                game.next();
            });
        },
        next: () => {
            q.RQG();
            q.display();
        },
        reset: () => {
            q.current = 0;
            q.num = 0;
            game.correct = 0;
            game.incorrect = 0;
            clearInterval(timer.i);
            $('.game').fadeOut(500);
            $('.end').fadeOut(500);
            setTimeout(() => {
                $('.mode').fadeIn();
            }, 800);
        },
        percent: () => {
            $('.percent').text((game.correct + game.incorrect) / 10 * 100 + '%');
        },
    };


    //main program
    $("#easy").on('click', () => {
        timer.mode = $('#easy').attr('value');
        game.start();
        
    });
    $("#med").on('click', () => {
        timer.mode = $('#med').attr('value');
        game.start();
    });
    $("#hard").on('click', () => {
        timer.mode = $('#hard').attr('value');
        game.start();
    });
  game.aChecker();
});