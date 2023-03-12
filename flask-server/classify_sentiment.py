import cohere
co = cohere.Client('RMppgVMUjgiKZRWSIwjmmfbOwRa9YEhi1B15oxQ2')

from cohere.classify import Example

examples=[
  Example("Click this link to get free money!", "spam"),
  Example("You're eligible for a free prize!", "spam"),
  Example("Sign up for our newsletter and get discounts!", "spam"),
  Example("Buy now and get 50% \off!", "spam"),
  Example("Visit our website for the best deals!", "spam"),
  Example("Congratulations, you won the lottery!", "spam"),
  Example("Come join us for a free webinar!", "spam"),
  Example("Follow us on social media to stay up to date!", "spam"),
  Example("This offer is too good to be true!", "spam"),
  Example("The new product launch is this week!", "non-spam"),
  Example("Hey, check out this new article!", "non-spam"), 
  Example("We are having a sale this weekend!", "non-spam"),
  Example("Join us for a free virtual event!", "non-spam"),
  Example("Have you seen our new product line?", "non-spam"),
  Example("Follow us on social media for updates!", "non-spam"),
]


def classify_sentiment(text):
    response = co.classify(
        model='large',
        inputs=[text],
        examples=examples,
    )
    print(response.classifications)
    return response.classifications

classify_sentiment("Win a free prize!")
# sample output The confidence levels of the labels are: [{'spam': 0.9999999999999999, 'non-spam': 1.1102230246251565e-16}]
