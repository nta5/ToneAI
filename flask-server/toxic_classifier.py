import cohere
co = cohere.Client('RMppgVMUjgiKZRWSIwjmmfbOwRa9YEhi1B15oxQ2')

from cohere.classify import Example

examples=[
  Example("You're an idiot", "toxic"),
  Example("I hate you", "toxic"),
  Example("You are stupid", "toxic"),
  Example("I will never forgive you", "toxic"),
  Example("What a loser", "toxic"),
  Example("I am feeling great today!", "positive"), 
  Example("I just got a promotion!", "positive"), 
  Example("I love spending time with my family", "positive"), 
  Example("I am so excited for tomorrow", "positive"), 
  Example("I am feeling content", "positive"), 
  Example("I had a wonderful time at the park", "positive"), 
  Example("I am looking forward to my vacation", "positive"), 
  Example("This meal was delicious", "positive"), 
  Example("I am so proud of my accomplishments", "positive"),
  Example("The weather is mild", "neutral"),
  Example("I ran for an hour", "neutral"),
  Example("The movie was average", "neutral"),
  Example("The store was closed", "neutral"),
  Example("I took the bus home", "neutral"),
  Example("The food was okay", "neutral"),
  Example("It was an average day", "neutral"),
]


inputs=[
"You are amazing!",
# "You are a complete failure.",
# "It's a beautiful day outside.",
]

response = co.classify(
  model='large',
  inputs=inputs,
  examples=examples,
)

print(response.classifications)