// Email Thread Problem
// If the body is the same, they are considered to be from the same thread
// the response will always be ahead of the previously sent mail separated by "---"
// the email is given in the order it was sent
// 3 fields: sender / the one who receives / body
// the thread always includes the same two people
// for each mail determine the thread id and the email number of that thread

// n is the number of emails
// is an array of emails
// it has to return a two-dimensional array [(1,1), (2,1), (1,2)] where the first number (integer) is the email thread id,
// and the second is the number of emails in the thread


function getEmailThreads(emails) {
    // Write your code here

    let result = [];
    // I create an array of objects where I will save the results
    let objectForArray = [];

    // Iterating over the email array to determine the parts (Sender / Receiver / Body)
    for (let i = 0; i < emails.length; i++) {

        // model emailObject
        let emailObject = {
            senderAndReceiver: [],
            bodyOfEmail: "",
            messagesQuantity: 1,
        }

        // Divide the parts of each email module
        let eachPart = emails[i].split(",");
        //console.log(eachPart)
        // people = sender and receiver and with the trim I eliminate the empty spaces
        emailObject.senderAndReceiver = [eachPart[0].trim(), eachPart[1].trim()];
        //console.log(emailObject.senderAndReceiver)
        // as inside the body there are also, I have to conctenate the messages and remove the spaces

        for (let j = 2; j < eachPart.length; j++) {
            emailObject.bodyOfEmail = emailObject.bodyOfEmail.concat(eachPart[j].trim());
        }
        //console.log(emailObject.bodyOfEmail)
        // by default I assume it is a new thread
        let newThread = true;

        for (let k = 0; k < objectForArray.length; k++) {
            console.log(objectForArray[k])
            // comparisonObject -> is the object that I use as a base to see if it is a new thread
            // objectForArray already has things loaded and here I compare it with the new thread that I am analyzing
            // object is the one that I am creating in each turn of i

            let comparison = objectForArray[k];
            console.log(comparison)
            if (comparison.senderAndReceiver[0] === emailObject.senderAndReceiver[0] && comparison.senderAndReceiver[1] === emailObject.senderAndReceiver[1] ||
                comparison.senderAndReceiver[1] === emailObject.senderAndReceiver[0] && comparison.senderAndReceiver[0] === emailObject.senderAndReceiver[1]) {

                // if it has the same people and also contains part of the body, then it is not a new thread -> false
                if (emailObject.bodyOfEmail.includes(comparison.bodyOfEmail)) {

                    // I add one to count how many replies that thread had
                    comparison.messagesQuantity += 1;
                    comparison.bodyOfEmail = emailObject.bodyOfEmail;

                    newThread = false;

                    result.push([k + 1, comparison.messagesQuantity]);

                }
            }

        }

        // if it is a new thread, I add it to the arrayObjects
        if (newThread === true) {
            objectForArray.push(emailObject);

            result.push([objectForArray.length, 1]);
        }

    }

    return result;
}

// console.log(getEmailThreads(['c@gmail.com, abc@gmail.com, did you take a look at the event?',
// 'x@gmail.com, abc@gmail.com, i am great. how are you?---hello x, how are you?',
// 'abc@gmail.com, x@gmail.com, hey que onda la vida---i am great. how are you?---hello x, how are you?',
// 'x@gmail.com, abc@gmail.com, this is not the same thread hello x, how are you?']));

console.log((getEmailThreads(['c@gmail.com, abc@gmail.com, did you take a look at the event?'])));
///    'abc@gmail.com, x@gmail.com, hey que onda la vida---i am great. how are you?---hello x, how are you?']));