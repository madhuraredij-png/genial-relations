# Genial Relations — Content v0.1

Oct 20, 2026 · @Madhura Redij

**Changes from the screen reviews.** The mystery now asks one question: **is King kin?** Every testimony points at King, and Kin is renamed **Kindred** so the guest and the question don't collide. Gingerly, Germ, Genie and Kriss Kringle stay as guests, but none of them is a suspect any more.

- [x] Assign King's steps to tables and guests, with a snippet hint each (see "King's line").
- [x] Write the rumours and two decoys (Genius: *rex*; Kindergarten: Kringle).
- [x] Old testimonies about Gingerly, Germ, Genie and Kriss Kringle stay as colour and pin nothing.
- [ ] Review the drafted copy: six testimonies marked "(rumour…)" or "(step…)", the five hints, Kindred's record and gossip, Gene's record.
- [ ] Decide Gene: keep as the namesake (he now holds the record-only step), or replace with neonate.

## How the content works

The reunion has 25 guests: 21 seated at five tables and 4 floaters who move around the room. Every guest holds one clue about King, the one guest whose place in the family is in doubt, so any place card is worth tapping.

**Three page types**

- **Landing page.** The invitation, framed by marginalia. Every mark in the margin is a door to a guest or a table. Collected evidence pins into the same margin, which then becomes your trail card.
- **Table page.** A round table seen from above, place cards around the edge, and an overheard snippet in the middle. The snippet sets up the table's event and points to one guest.
- **Word page (character format).** Four parts: the record (sourced, in our own words), the gossip, the guest's testimony (their clue), and links.

**Clue structure: pointer + split**

1. The snippet asks the question and points to a guest. That's the first half.
2. The guest's page gives their testimony. That's the second half.
3. Opening a guest's page that holds a step or a rumour pins it automatically. Each table holds at least one step of King's line; one more sits only in a record.
4. Some word pages point to a guest at another table. These are leads, never requirements, so the story still works from any starting point.

**The generative snippet**

Each table has a bank of lines, and the page assembles a fresh snippet on every visit:

1. One **setup line**, picked at random from that table's set.
2. One **pointer line** for a guest you haven't visited yet. Once you've visited everyone, any guest can come up.
3. Sometimes a **floater cameo**, about one visit in three.

Rules: never show the same pointer line twice in a row, and never point to the guest you just came from.

The bank below is written ahead of time and fact-checked. This is called *build-time generation*: the variety comes from recombining lines that already exist, and nothing is written live. A v2 could write new lines live with an AI call (*runtime generation*), but that brings cost, delay and unchecked facts. Every pointer line therefore carries gossip only, never a new fact.

## Tone guide

The register is a dry family comedy in which every joke rests on a real fact about the word. If you can't point to the record behind a joke, cut it.

**Do**

- Let personality come from the record: a word's age, its route into English, and its old meanings.
- Give words human grievances, such as seating, surnames, who arrived first, and who changed the most.
- Keep lines short, at one or two sentences per guest.
- Write hedged facts as gossip ("*perhaps*," "*nobody's sure*").

**Don't**

- Invent dates, routes or relatives, even as a joke.
- Joke about religion. Kriss Kringle's record names the Christ child; the joke is his Santa costume, never the figure himself.
- Joke about bodies. Pregnant's humour comes from "news" and "full of meaning," not from pregnancy.
- Use the excluded words from the root list (see the spec).
- Use slurs, current politics, or real living people.

**Voice by role**

| Role | Voice |
| --- | --- |
| Head table | Formal, slightly anxious hosts |
| Old money | Old, polite, a little smug |
| The academics | Precise and pedantic; they correct each other |
| Back with an accent | Fashionable and dramatic; they drop French |
| Kids' table | Earnest and blunt; they say what adults won't |
| Floaters | Each with one tic: Genie is theatrical, Germ is quiet and growing, Gingerly is nervous, Pregnant speaks in meaningful pauses |

## Landing page and reunion hall

The landing page is an invitation, and the reunion hall is the room behind it.

**Invitation copy (draft)**

> **You are cordially invited** to the reunion of the descendants of \*gene- *("to give birth, beget" · date of birth unknown · not available for comment)*
>
> 25 guests · 5 tables · 1 family secret Dress code: whatever you were born in. Some of the guests have taken this too far.
>
> **\[Find your seat\]**

**The mystery hook (shown once, under the invitation)**

> Someone at this reunion is not who they say they are. Visit every table, collect what the family lets slip, and deliver your verdict at the head table.

**Marginalia doorways**

The margin is a scatter of objects left behind by the guests, with no drawn figures or creatures. Each guest has one object, grouped by table, and each table's name is handwritten beside its cluster. Tap an object to open its owner's page; tap a table's name to open the table.

**Rules:** one pen, one line weight, one scale. Every object has exactly one owner. Every object comes from its owner's record or gossip. Evidence pins are drawn in the same hand, so the margin fills up with things that belong there.

| Table | Guest | Object |
| --- | --- | --- |
| Head table | kindred | The guest list, one name underlined twice |
| Head table | kind | Two name tags pinned together |
| Head table | king | A crown, sitting on a chair |
| Old money | gentle | A pair of gloves |
| Old money | benign | A bread roll |
| Old money | malign | A napkin with one word underlined |
| Old money | nature | A sprig of leaves |
| Old money | engine | A wind-up key |
| The academics | genius | A lit candle (the guardian keeping watch) |
| The academics | genial | A wedding ribbon |
| The academics | ingenious | A folded diagram |
| The academics | ingenuous | A place card with someone else's name on it |
| Back with an accent | genteel | A teacup |
| Back with an accent | jaunty | A hat, tilted |
| Back with an accent | generous | A gift tag |
| Back with an accent | naive | A French phrasebook |
| Back with an accent | puny | A judge's wig, far too big |
| Kids' table | kindergarten | A stick of chalk |
| Kids' table | Kriss Kringle | A false beard |
| Kids' table | gene | A crayon |
| Kids' table | wunderkind | A metronome |
| Floaters | genie | A lamp with a curl of smoke |
| Floaters | germ | A seedling |
| Floaters | gingerly | Tiptoe footprints |
| Floaters | pregnant | A sealed envelope (the news) |

As you collect evidence, each piece pins into this margin. The full margin is your trail card.

**Reunion hall (floaters between tables)**

Floaters stand in the gaps between tables, each as a word on torn paper, scattered at random. Tapping one opens a paper card with one of these lines:

- **Genie:** "Three wishes, darling, but none of them about my past."
- **Germ:** "Just… growing."
- **Gingerly:** "Don't mind me. Please don't mind me."
- **Pregnant:** "I have news." · "…" · "Ask me later."

## Head table · Old English

The oldest residents host the reunion. The event is the toast, and the question is who gets to give it. The suspect is **King**, who insists on the head chair.

### Table page

**Setup lines (one per visit)**

1. *Kindred taps a glass. Nobody stops talking. King stands up anyway.*
2. *"Whoever gives the toast sits at the head," says Kind. King is already sitting there.*
3. *The seating chart has been rewritten three times, all in King's handwriting.*

**Pointer lines**

| Guest | Variants |
| --- | --- |
| kindred | "Ask Kindred, she wrote the guest list." · "Kindred keeps the family records. Kindred also keeps grudges." · "Kindred hasn't said a word to King all night. That's a word in itself." |
| kind | "Kind knows more than she's letting on. She always does." · "Kind has two names on her place card. Ask her why." · "Ask Kind. She was there when the family wrote things down." |
| king | "Ask King yourself. He's dying to tell you." · "King has a quote ready. He's had it ready for generations." · "Someone should ask King for his papers. Nobody has the nerve." |

### kindred

**Record:** From *kin* + *-red*, first recorded around 1200, perhaps from a late Old English *kinraden*. The first *d* doesn't belong: it crept in during the 1600s, probably because it's easier to say, perhaps helped along by *kind*. The *kin* in it is Old English *cynn*, family, from \*gene-. [Etymonline](https://www.etymonline.com/word/kindred)

**Gossip:** The family historian. Picked up an extra *d* in the 1600s and will not discuss it. \[DRAFT, replaces the kin gossip: yours to rewrite\]

**Testimony:** "There are two stories about him. In one, a king is the leader of the people, meaning *our* people. In the other, he's from a word for noble birth, a different line entirely. I wrote both down. I underlined neither."

**Links:** Blood: kind (sibling), king (claims to be her brother) · Gossip: gentle (they compare notes on what counts as "family") · Across the room: gentle, at Old money

### kind

**Record:** The noun comes from Old English *gecynd*, "kind, nature, race," related to *cynn*. Ælfric's Old English Genesis was titled *gecyndboc*. The adjective, "friendly," has its own separate entry. [Etymonline](https://www.etymonline.com/word/kind)

**Gossip:** Leads a double life: a category by day, a nice person by night. Has two entries in the dictionary and resents being asked which one is real.

**Testimony:** "Our name is *cynn*. His is *cyning*. Close enough to sit together. Not close enough to stop people talking."

**Links:** Blood: kindred (sibling) · Gossip: benign (they're both called "kind" behind their backs) · Across the room: kindergarten, at the kids' table ("My German nephew. Same word for child.")

### king

**Record:** A late Old English contraction of *cyning*. It may come from *cynn* ("leader of the people") or from a related Germanic word for noble birth. The Century Dictionary calls the link to *kin* undetermined but hardly to be doubted. [Etymonline](https://www.etymonline.com/word/king)

**Gossip:** Has quoted the Century Dictionary at every reunion since it was published. Brings his own chair.

**Testimony:** "*Hardly to be doubted.* That's what the dictionary says. I had it framed. Ignore the part above it, where it says *undetermined*."

**Links:** Blood: kindred (probably) · Gossip: Kriss Kringle (two men who both expect a throne) · Across the room: Kriss Kringle, at the kids' table

## Old money · Old French

These guests arrived from French in the 1200s and 1300s and have been polite about it ever since. The event is the twins' feud: Benign and Malign were seated together on purpose. **Gingerly, a floater,** keeps tiptoeing past.

### Table page

**Setup lines**

1. *Benign passes the bread. Malign passes judgement.*
2. *"Lovely to see everyone," says Gentle, to the four people she's sure about.*
3. *Someone has been creeping past this table all evening, very, very carefully.*

**Pointer lines**

| Guest | Variants |
| --- | --- |
| gentle | "Gentle says he's no cousin of hers. Ask her how she knows." · "Gentle keeps the family tree. She's crossed one name out in pencil." · "Gentle has been very gentle about it. Ask her anyway." |
| benign | "Benign noticed something. Benign notices everything, kindly." · "Ask Benign. She remembers him before he got so careful." · "Benign won't gossip. Ask her twice." |
| malign | "Malign has a theory. Malign always has a theory." · "Ask Malign. You'll regret it, but ask." · "Malign has written one word on his napkin and underlined it." |
| nature | "Nature has seen every birth at this reunion except one." · "Ask Nature. She's very old and very blunt." · "Nature is asking for birth certificates. One guest left the room." |
| engine | "Engine has worked out how he got here. Probably." · "Ask Engine. He's been drawing diagrams on the tablecloth." · "Engine says the parts fit. Engine says that about everything." |

### gentle

**Record:** In English from the early 1200s, meaning well-born, of a noble family. From Old French *gentil* and Latin *gentilis*, "of the same family or clan." The old sense survives in *gentleman*. [Etymonline](https://www.etymonline.com/word/gentle)

**Gossip:** The family's social secretary. She has been borrowed back from French twice since she arrived, and she is not pleased about how either one turned out.

**Testimony (rumour, step 5):** "They say his name was never about family. It's about breeding: some old Germanic word for noble birth. Finally, a relative with standards."

**Links:** Blood: genteel, jaunty (the same word, borrowed again) · Gossip: kindred ("clan" is her word too) · Across the room: genteel, at Back with an accent

### benign

**Record:** From the early 1300s, via Old French. Latin *benignus*, kindly, is literally "well born." [Etymonline](https://www.etymonline.com/word/benign)

**Gossip:** The good twin. Has been called "kind" so often that Kind has started to take it personally.

**Testimony:** "He was *elegant* once, back in the 1510s. By about 1600 he was tiptoeing everywhere. Something happened in between, and nobody will tell me what."

**Links:** Blood: malign (twin) · Gossip: kind · Across the room: generous, at Back with an accent ("another one born noble and now just nice")

### malign

**Record:** From the early 1300s, first of things ("wicked, sinful"), later of people. Latin *malignus*: *male*, badly, + *-gnus*, born. [Etymonline](https://www.etymonline.com/word/malign)

**Gossip:** The evil twin, born the same decade, by the same route, from the same root. Was simply born badly, and has made a whole personality of it.

**Testimony:** "Origin: *unknown*. That's what the record says about him. Unknown! At a family reunion! I'm only saying what everyone's thinking."

**Links:** Blood: benign (twin) · Gossip: genteel (they both say nice things only in mockery) · Across the room: genteel, at Back with an accent

### nature

**Record:** From the late 1200s, via Old French. Its first English sense was the body's powers of growth and repair. Latin *natura* literally means "birth." [Etymonline](https://www.etymonline.com/word/nature)

**Gossip:** Literally named "birth." Has attended every christening in the family and remembers all of them.

**Testimony:** "I was there for every birth at this table. Gingerly's? No record. No one even knows which language he was born in."

**Links:** Blood: naive (both from Latin "born") · Gossip: pregnant (they talk shop) · Across the room: naive, at Back with an accent

### engine

**Record:** From about 1300, first a mechanical device, especially for war, but also skill, cleverness, even trickery. Old French *engin*, from Latin *ingenium*, "inborn character." The sense of a machine that turns energy into motion arrives in the 1700s. [Etymonline](https://www.etymonline.com/word/engine)

**Gossip:** Was born a talent and became a machine. Still describes himself as "a natural gift." Nobody has the heart to correct him.

**Testimony:** "I ran the mechanism. Latin *well-born*, to Old French *dainty*, to *more dainty*, to Gingerly. It works on paper. Nobody has ever found the parts."

**Links:** Blood: ingenious (both from *ingenium*) · Gossip: gene (two technical types) · Across the room: ingenious, at the academics

## The academics · Latin

These guests came into English straight from Latin and want you to know it. The event is the swapped place cards: Ingenious and Ingenuous have been sat in each other's seats, again. **Germ, a floater,** is quietly growing in the corner.

**Design note:** on this table page, the Ingenious and Ingenuous cards really are swapped. Tapping one opens the other's page, and that page corrects you.

### Table page

**Setup lines**

1. *Ingenious is sitting in Ingenuous's seat. Ingenuous hasn't noticed. Ingenuous never notices.*
2. *Genius is explaining footnotes to someone who didn't ask.*
3. *Something small in the corner has doubled in size since the soup.*

**Pointer lines**

| Guest | Variants |
| --- | --- |
| genius | "Genius has been keeping an eye on him. It's literally his job." · "Ask Genius. He'll tell you anyway." · "Genius says he knew Germ before he went bad." |
| genial | "Genial thinks Germ is lovely. Ask her what she doesn't know." · "Genial arranged half the marriages here. Ask her about his parents." · "Ask Genial. She's the only one still smiling." |
| ingenious | "Ingenious has a theory with a diagram." · "Ask Ingenious. The clever one. No, the other clever one." · "Ingenious found something in the Latin." |
| ingenuous | "Ingenuous believes everything Germ told her. Ask what he told her." · "Ask Ingenuous. She'll say yes to anything." · "Ingenuous has been sitting in the wrong seat all night. She'll tell you everything." |

### genius

**Record:** From the late 1300s, first a guardian or moral spirit that guides a person through life. Latin *genius* was the spirit watching over each person from birth, originally "generative power" or "inborn nature." [Etymonline](https://www.etymonline.com/word/genius)

**Gossip:** Was a guardian spirit before he was a compliment. Still hovers over people when they work.

**Testimony (rumour, decoy):** "Obviously he's Latin *rex*. Rex, king. Same title, same family. I don't need to check."

**Links:** Blood: genie ("my little brother; we don't discuss it") · Gossip: ingenious (rivals) · Across the room: genie, wherever he's floating

### genial

**Record:** From the 1560s, meaning "pertaining to marriage," from Latin *genialis*, festive, originally of wedding rites. It meant "cheerful, friendly" by 1746. [Etymonline](https://www.etymonline.com/word/genius)

**Gossip:** Started out as the wedding planner. Now she's just pleasant. Still keeps a list of who married whom.

**Testimony:** "Lovely boy, very wholesome. Wheat germ, you know. But his Latin is *of uncertain origin*. I've married off half this family, and I couldn't tell you who his parents are."

**Links:** Blood: genius (from his name) · Gossip: pregnant (old friends) · Across the room: pregnant, wherever she's floating

### ingenious

**Record:** From the early 1400s, meaning intellectual, talented. Via Old French from Latin *ingeniosus*, built on *ingenium*, "that which is inborn." [Etymonline](https://www.etymonline.com/word/ingenious)

**Gossip:** The clever one. Has been mistaken for Ingenuous for four hundred years, Shakespeare included, and has never let it go.

**Testimony:** "Here's the clever bit. His Latin, *germen*, also sits behind *german*, as in *cousin-german*, a first cousin. If the scholars are right, he's family twice over. If they're wrong, he's family nowhere."

**Links:** Blood: engine (both from *ingenium*), ingenuous (same root, different Latin word) · Gossip: ingenuous ("stop sitting in my seat") · Across the room: engine, at Old money

### ingenuous

**Record:** From the 1590s, meaning noble-minded and straightforward. Latin *ingenuus* first meant native or freeborn, literally "born in." The sense "artless, innocent" arrives in the 1670s. In the 1600s it was confused with *ingenious* so often that even Shakespeare mixed them up. [Etymonline](https://www.etymonline.com/word/Ingenuous)

**Gossip:** The innocent one. Has never once noticed she's in the wrong seat.

**Testimony (rumour, step 3):** "King told me the family list calls him *possibly* ours. Possibly is practically yes! Isn't it? Is it?"

**Links:** Blood: ingenious (same root) · Gossip: naive (best friends; they believe each other) · Across the room: naive, at Back with an accent

## Back with an accent · later French

These guests arrived from French in the 1500s and 1600s, several of them for the second time. The event is the costume parade: who has changed the most since they arrived? **Genie, a floater, turns up** in an extravagant outfit.

### Table page

**Setup lines**

1. *Genteel and Jaunty arrive in matching outfits. Gentle, two tables away, pretends not to see.*
2. *"Before we judge costumes," says Generous, "everyone looks wonderful." Nobody believes Generous.*
3. *A puff of smoke drifts past the table. Several guests cough pointedly.*

**Pointer lines**

| Guest | Variants |
| --- | --- |
| genteel | "Genteel knew him in France. Ask her, politely." · "Genteel has opinions about his costume. Only in mockery, of course." · "Ask Genteel. She's been dying to." |
| jaunty | "Jaunty knows exactly where that costume came from." · "Ask Jaunty. He'll do the accent." · "Jaunty was there when the costume first went on." |
| generous | "Generous has been covering for him for centuries. Ask how long." · "Ask Generous. She'll say nothing unkind, which tells you plenty." · "Generous knows the date. Generous always knows the date." |
| naive | "Naive believes the lamp story. Ask her what doesn't add up." · "Ask Naive. She noticed something without meaning to." · "Naive asked him a question. He didn't answer it." |
| puny | "Nobody tells Puny anything, so Puny listens. Ask him." · "Puny overheard something at the academics' table." · "Ask Puny. He's furious about it, whatever it is." |

### genteel

**Record:** From the 1590s, meaning fashionably elegant. It's the same French word that had come in earlier as *gentle*, borrowed again with the French pronunciation kept on purpose. The OED notes that since the 1840s it has mostly been used in mockery. [Etymonline](https://www.etymonline.com/word/genteel)

**Gossip:** Gentle's returning sister, back with an accent and a better coat. Everyone calls her lovely. Nobody means it.

**Testimony:** "He came over from France in the 1650s, the same as some of us. Back then he was a guardian spirit. Very respectable. Very *Latin*."

**Links:** Blood: gentle, jaunty (the same word) · Gossip: malign (they compare compliments) · Across the room: gentle, at Old money

### jaunty

**Record:** From the 1660s, meaning elegant, stylish. It was an imperfect, perhaps joking attempt to say French *gentil* the way the French did. By the 1670s it also meant easy and sprightly. [Etymonline](https://www.etymonline.com/word/jaunty)

**Gossip:** The third version of Gentle, and the only one having fun. Owes his whole existence to an accent.

**Testimony:** "Then a French translator cast him as the *jinni* in the *Arabian Nights*, because the two words happened to sound alike. Pure accident. He kept the costume."

**Links:** Blood: gentle, genteel · Gossip: Kriss Kringle (two guests in costume) · Across the room: Kriss Kringle, at the kids' table

### generous

**Record:** From the 1580s, meaning "of noble birth," via French from Latin *generosus*. The sense "unselfish" comes in the 1690s. [Etymonline](https://www.etymonline.com/word/generous)

**Gossip:** Born noble, now merely nice, and covering for everyone.

**Testimony:** "Since 1748 he's been introducing himself in English as the lamp fellow. I let it go. I let everything go. It's my whole thing."

**Links:** Blood: benign (same story: born noble, now kind) · Gossip: genial · Across the room: benign, at Old money

### naive

**Record:** From the 1650s, meaning natural, simple, artless. From French *naïve*, and before that Old French *naif*, which could mean genuine, just born, or foolish. Latin *nativus*, "born, native." Dryden used it in a 1673 comedy as one of the French words a character shows off with. [Etymonline](https://www.etymonline.com/word/naive)

**Gossip:** Arrived as a fashionable French word and still thinks that's what she is.

**Testimony:** "Wait, he's not from a lamp? He did say his *real* name was Latin. Isn't that… Genius's name?"

**Links:** Blood: nature (both from Latin "born") · Gossip: ingenuous (best friends) · Across the room: genius, at the academics

### puny

**Record:** From the 1570s, meaning inferior in rank, and earlier, as a noun, a junior pupil. From Old French *puisné*, "born later, younger, youngest," the opposite of *aisné*, first-born. The sense "small, weak" comes in the 1590s. His twin *puisne* came to mean a junior judge. [Etymonline](https://www.etymonline.com/word/puny)

**Gossip:** Literally "born later." Has been seated at the wrong table his whole life and now knows everybody's secrets.

**Testimony (rumour, step 4):** "Everyone's watching King. Nobody's watching Kindred. The *kin* in her name is Old English *cynn*, and that goes straight back to the old man in the portrait. Nobody tells *me* anything, so I listen."

**Links:** Blood: nature, naive (all "born" words) · Gossip: wunderkind (fellow youngest; they don't get along) · Across the room: wunderkind, at the kids' table

## Kids' table · German

The youngest arrivals all came in from German in the 1800s and 1900s, and every name at this table contains *Kind*, "child." (Gene is the exception: he came via German, but his name is Greek.) The event is a guest in a Santa suit handing out presents. **Nobody is sure who is inside** the suit.

### Table page

**Setup lines**

1. *A guest in a red suit is handing out presents. The beard is slipping.*
2. *Gene is explaining heredity with crayons. Nobody asked.*
3. *"Grown-ups have their own table," says Kindergarten, to Puny, who is grown up.*

**Pointer lines**

| Guest | Variants |
| --- | --- |
| kindergarten | "Kindergarten has worked something out about names. Ask her." · "Ask Kindergarten. She runs this table, and she'll remind you." · "Kindergarten keeps looking at the beard." |
| kriss kringle | "Ask the man in the suit. He's expecting you." · "Kriss Kringle wants to clear his name. Let him." · "Ask Kriss Kringle what's under the beard." |
| gene | "Gene has the dates. Gene always has the dates." · "Ask Gene. He'll make a chart." · "Gene says he can prove who's related to whom. He's very young." |
| wunderkind | "Wunderkind looked him up. Of course Wunderkind looked him up." · "Ask Wunderkind. Prodigies notice things." · "Wunderkind isn't impressed by the suit. Ask why." |

### kindergarten

**Record:** In English from 1852, from German *Kinder-Garten* (1840), "children's garden," a name coined by the educator Friedrich Fröbel. [Etymonline](https://www.etymonline.com/word/kindergarten)

**Gossip:** The self-appointed teacher, even though Kriss Kringle got here 22 years before her. Runs the table like a classroom.

**Testimony (rumour, decoy):** "Kringle, King. Both start with K, both expect presents. He's royalty, obviously."

**Links:** Blood: kind (her German *Kind* is related to *kin* and *kind*), wunderkind · Gossip: genius (both run study groups) · Across the room: kind, at the head table

### Kriss Kringle

**Record:** First recorded in 1830 as *Christ-kinkle*, in a Pennsylvania German setting, from German *Christkindlein*, "Christ child." The second part is a diminutive of *Kind*, child. Etymonline notes the name properly refers to the Christ child, not Santa Claus. [Etymonline](https://www.etymonline.com/word/Kriss%20Kringle)

**Gossip:** Arrived in a borrowed red suit and has been mistaken for someone else ever since. Too polite to correct anyone.

**Testimony:** "Fine. The suit is borrowed. But my name is family: the end of it is German for 'little child.' Ask anyone at this table."

**Links:** Blood: kindergarten, wunderkind (all *Kind*) · Gossip: king (both expected a throne), jaunty (both in costume) · Across the room: king, at the head table

### gene

**Record:** In English from 1911, from German *Gen*, coined in 1905 by the Danish scientist Wilhelm Johannsen, from Greek *genea*, "generation, race," from \*gene-. *Kin* comes from the same ancestor: one line spells it with k, the other with g. [Etymonline](https://www.etymonline.com/word/gene)

**Gossip:** The youngest guest at the reunion and the most certain about everything. Thinks he invented the family.

**Testimony:** "He first shows up in English in 1830. That makes him younger than nearly everyone here, and older than me. I checked."

**Links:** Blood: genius, genial (Greek and Latin cousins) · Gossip: engine (two technical types) · Across the room: engine, at Old money

### wunderkind

**Record:** In English from 1883: a child prodigy, especially in music. From German *Wunderkind*, "wonder-child." The *wonder* half goes back to Old English *wundor*, a word of unknown origin. [Etymonline](https://www.etymonline.com/word/wunderkind)

**Gossip:** The prodigy. Half of her name is family; the other half has no known origin. She doesn't like to discuss it.

**Testimony (step 2):** "In German he's *König*. In Dutch, *koning*. Every one of them goes back to the same Germanic grandfather, *kuningaz*. I made a chart."

**Links:** Blood: kindergarten, Kriss Kringle · Gossip: puny (rival youngest children) · Across the room: puny, at Back with an accent

## Floaters

Floaters stand between the tables in the reunion hall and turn up in cameo lines at the tables. Each one's page holds their own statement, which is also a clue. None of them is a suspect; Pregnant is the family's expert on evidence.

**Cameo lines (added to a table's snippet about one visit in three)**

| Floater | Cameos | Tables |
| --- | --- | --- |
| Genie | "*A puff of smoke. Someone says 'bless you.' Genie says 'thank you, I'll take that as a wish.'*" · "*Genie drifts past, humming something in Latin.*" | Back with an accent, the academics |
| Germ | "*Something in the bread basket is growing.*" · "*Germ waves from the corner. He's a little bigger than last time.*" | The academics, kids' table |
| Gingerly | "*Someone tiptoes past. Very elegantly. Very carefully.*" · "*Gingerly picks up a fork as if it might go off.*" | Old money, head table |
| Pregnant | "*Pregnant pauses by the table. The pause is full of meaning.*" · "*'I have news,' says Pregnant, and leaves.*" | Every table |

### genie

**Record:** From the 1650s, meaning a guardian spirit, from French *génie*, from Latin *genius*. A French translation of the *Arabian Nights* used it for the Arabic *jinni*, which it happened to resemble; English picked up that sense by 1748. [Etymonline](https://www.etymonline.com/search?q=genius)

**Gossip:** Genius's little brother, who found a better costume and never took it off.

**Statement:** "I am family. Latin, like my brother. The lamp was a translator's idea; the words just sounded alike. Is it a crime to commit to a role?"

**Links:** Blood: genius (brother) · Gossip: jaunty, Kriss Kringle (the costume club) · Seen at: Back with an accent, the academics

### germ

**Record:** From the mid-1400s, meaning bud or sprout; from the 1640s, the start of a new organism. Via French from Latin *germen*, of uncertain origin, perhaps from \*gene-. "Seed of a disease" is recorded in English in 1796, and "harmful microorganism" in 1871. The old sense survives in *wheat germ*. [Etymonline](https://www.etymonline.com/word/germ)

**Gossip:** Was a bud for centuries. Then 1871 happened, and nobody has shaken his hand since.

**Statement:** "*Perhaps.* That's what they write about me. Perhaps family. I was a bud once, you know. People only remember the other thing."

**Links:** Blood (perhaps): german, as in *cousin-german* · Gossip: genial (she's still kind to him), ingenious (has a theory about him) · Seen at: the academics, kids' table

### gingerly

**Record:** From the 1510s, meaning elegantly, daintily; from about 1600, extremely cautiously. Origin unknown. The OED suggests, as a *perhaps*, Old French *gensor*, "more dainty," which traces back to the same Latin as *gentle*. [Etymonline](https://www.etymonline.com/word/gingerly)

**Gossip:** Arrived elegant and became careful. Nobody knows what happened in between, least of all Gingerly.

**Statement:** "Origin unknown. I *know*. Please stop looking at me. I was elegant once. Then I got careful. That's not a crime. Is it?"

**Links:** Blood (perhaps): gentle · Gossip: benign (she remembers him before), nature (she wants his birth certificate) · Seen at: Old money, head table

### pregnant

**Record:** Two senses that are probably one word. From the late 1300s, of evidence or argument: cogent, convincing, full of meaning. From the early 1400s: with child, from Latin *praegnantem*, literally "before birth." The second sense was avoided in polite conversation until about 1950. [Etymonline](https://www.etymonline.com/word/pregnant)

**Gossip:** Was convincing before she was expecting. Has carried news around this family for six centuries and was not allowed to say it in polite company for most of them.

**Statement:** "Listen for the small words: *possibly*, *perhaps*, *unknown*. In this family, they're the loudest words in the room."

**Links:** Blood: nature, naive (both "born" words) · Gossip: genial (old friends) · Seen at: every table

## Verdict card and endings

### Verdict card

The verdict card opens at the head table once all five tables are visited. It shows the case file, every clue pinned so far in the order found, and asks one question. The record answers, and then the epilogue plays.

> **The family requests your verdict.**
>
> **Is King kin?** Kin · Not kin · Not proven

### King's line

Opening a guest's page that holds a clue pins it automatically. Steps pin on torn paper. Rumours pin on lined pencil paper and flip when a record settles them: confirmed, or struck through as "only sounds alike".

| # | Step | Where it's found | How | Table hint (snippet pointer) |
| --- | --- | --- | --- | --- |
| 1 | *King* ← Old English *cyning* | King's record (head table) | Step | Clear: "Someone should ask King for his papers. Nobody has the nerve." (existing) |
| 2 | *cyning* ← Proto-Germanic *kuningaz*; cousins German *König*, Dutch *koning* | Wunderkind's testimony (kids' table) | Step | Clear: "Wunderkind has drawn King's family tree in German. In crayon." |
| 3 | *kuningaz* is *possibly* related to *cynn*, "family" (the doubtful link) | Ingenuous's testimony (the academics) | Rumour, confirmed by King's record | Clear: "Ingenuous keeps repeating something King told him. Nobody has had the heart to check." |
| 4 | *cynn* ← \*gene- | Puny's testimony (Back with an accent) | Rumour, confirmed by Kindred's record | Vague: "Puny hasn't said a word all night. He's been listening." |
| 5 | Rival story: from a Germanic word meaning "noble birth" | Gentle's testimony (Old money) | Rumour, confirmed by King's record | Vague: "Gentle keeps saying some people are simply born to it. She doesn't mean you." |
| 6 | *kin* and *gene* share one ancestor: one line spells it with k, the other with g | Gene's record (kids' table) | Step, record only | None. Nothing points here. |

Sources: [Etymonline: king](https://www.etymonline.com/word/king) (steps 1, 2, 3, 5; it gives the cognates and "a related prehistoric Germanic word meaning 'noble birth'" without naming the word) · [Etymonline: kin](https://www.etymonline.com/word/kin) (step 4) · [Etymonline: gene](https://www.etymonline.com/word/gene) (step 6). Step 6 states only what the two entries show; it doesn't explain the sound change.

**Decoys** (rumours that flip to a look-alike when a record checks them)

| Rumour | Held by | Flips to | Source |
| --- | --- | --- | --- |
| King is Latin *rex* | Genius (the academics) | "Only means the same: *rex* comes from \*reg-, 'move in a straight line', not \*gene-." | [Etymonline: rex](https://www.etymonline.com/word/rex) |
| Kriss Kringle is royalty | Kindergarten (kids' table) | "Only sounds alike: *Kringle* is German *Christkind'l*, little Christ child." | [Etymonline: Kriss Kringle](https://www.etymonline.com/word/Kriss%20Kringle) |

The other testimonies about Gingerly, Germ, Genie and Kriss Kringle stay as family colour. They pin nothing.

**After the verdict** the reader sees their answer next to the record: "You and the record agree" or "You and the record disagree". There's no score and no losing.

### Ending 1: Not proven

> Kindred clears her throat and reads from the family records.
>
> King's papers say *possibly*. His link to kin is undetermined, but hardly doubted.
>
> In a court, that would be a problem. At a reunion, that's most of the guest list.
>
> King keeps the head chair. He is paying for dinner.
>
> *Verdict: not proven. Motion to have dessert: carried.*

### Ending 6: You (always follows)

> One last place card is left on the head table. It has your name on it.
>
> You read English. Every guest here lives in your mouth: kindred, kind, gentle, genius, naive, puny. You've been at this reunion your whole life.
>
> **Welcome to the family.**
>
> &#91;Your trail card\] · \[Send an invitation\]

**Trail card:** the landing page's margin with every evidence piece you collected, your path drawn in red pencil, and your verdict stamped in the corner.

**Invitation (sent to a friend):** "You're invited to the \*gene- reunion. Someone there isn't who they say they are. I think you'll like Puny." The guest named in it is the last word page the sender visited.

## Fact check status

Every record line was checked against its Etymonline entry on 2026-10-20. Personalities, events, dialogue and testimony wording are fiction built on those facts. Before launch, re-open each entry and confirm the record line is in our own words, not copied.

| Word | First in English | Route | Status |
| --- | --- | --- | --- |
| kindred | about 1200 | kin + -red, perhaps late Old English kinraden | Checked 2026-10-22 |
| kind | Old English | Old English | Checked |
| king | late Old English | Old English | Checked |
| gentle | early 1200s | Old French | Checked |
| benign | early 1300s | Old French | Checked |
| malign | early 1300s | Old French | Checked |
| nature | late 1200s | Old French | Checked |
| engine | about 1300 | Old French | Checked |
| genius | late 1300s | Latin | Checked |
| genial | 1560s | Latin | Checked |
| ingenious | early 1400s | Old French + Latin | Checked |
| ingenuous | 1590s | Latin | Checked |
| genteel | 1590s | French | Checked |
| jaunty | 1660s | French | Checked |
| generous | 1580s | French | Checked |
| naive | 1650s | French | Checked |
| puny | 1570s | French | Checked |
| kindergarten | 1852 | German | Checked |
| Kriss Kringle | 1830 | German | Checked |
| gene | 1911 | German (from Greek) | Checked |
| wunderkind | 1883 | German | Checked |
| genie | 1650s | French | Checked |
| germ | mid-1400s | French | Checked |
| gingerly | 1510s | Unknown | Checked |
| pregnant | late 1300s / early 1400s | Old French / Latin | Checked |

**Open items**

- "Ælfric's Old English Genesis was titled *gecyndboc*" (kind) is from Etymonline only; a second source would be good.
- Ingenious is seated with the academics, but Etymonline gives its route as Old French and Latin. Keep it there for the twin joke, or move it to Old money.

## Sources

- [Etymonline: \*gene-](https://www.etymonline.com/word/*gene-) and each word entry linked in its record line above
- [Etymonline: genius / genie / genial](https://www.etymonline.com/search?q=genius)
- [Etymonline: wunderkind](https://www.etymonline.com/word/wunderkind)
