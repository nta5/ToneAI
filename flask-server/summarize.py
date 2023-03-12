import cohere
import os
from dotenv import load_dotenv

load_dotenv()
co = cohere.Client(os.getenv('COHERE_API_KEY','RMppgVMUjgiKZRWSIwjmmfbOwRa9YEhi1B15oxQ2'))

# we will need to connect the post request to get the text from the user here as well
text = 'The U.S. Senate has passed a bill that would make daylight time permanent, but questions remain as to whether this could be beneficial to Canadians who want to keep daylight time year-round.'


prompt = f"""Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

TLDR: Wordle has not gotten more difficult to solve.
--
Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

TLDR: ArtificialIvan has raised $190 million in Series C funding.
--
Passage: Last March, after a surprising unanimous vote in the U.S. Senate chamber, it seemed that time may have run out on the age-old practice of changing clocks twice a year.

The problem, however, was that some senators weren't exactly aware of the ramifications of their unanimous vote to make daylight time permanent.

That means that similar legislation, reintroduced last week, may not fly through the Senate as easily this time around. And it raised questions as to whether there might be a bright future for Canadians who support keeping daylight time all year. 

"Personally, I'm more negative than I was last year," said Thomas Gray, an assistant professor of political science at the University of Texas at Dallas. "It passed the Senate last year, but it definitely passed because people weren't paying attention."

TLDR: Last year, a bill that would make daylight time permanent passed the U.S. Senate unanimously, but questions remain as to whether this could be beneficial to Canadians who want to keep daylight time year-round.
--
Passage: {text}

TLDR:"""


# Summarize the text 

def summarize(text):
    response = co.generate(
        model='xlarge',
        prompt = text,
        max_tokens=40,
        temperature=0.8,
        stop_sequences=["--"])
    summary = response.generations[0].text
    # print(summary)
    return summary

# summarize(prompt)

