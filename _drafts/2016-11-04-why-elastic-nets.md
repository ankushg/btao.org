---
layout: post
title: "Why use elastic nets?"
---

The elastic net is a regularization method that tries to overcome some of the
potential problems with L1 and L2 regularization (respectively "LASSO" or
"ridge" regression in the context of linear regression).

## What's wrong with just L1 or L2? 
The lasso can be seen as a constraint problem where we want to minimize $$
\sum_{i=1}^{N} (y_i - \beta_0 - \sum_{j=1}^{p} x_{ij} \beta_j) ^ 2 $$ where
$$\sum_{j=1}^{p} | \beta_j | \leq t$$. With two-dimensional weights, this looks
like

!!--- picture ---!!

where the weights will most likely be somewhere on the perimeter of the
diamond.  Because of the sharp edges of the diamond, it's likely that the
contours of the loss will intersect with this diamond at a corner, which means
that one or more of the weights will be set to 0. For this reason, we say that
the lasso performs *feature selection* - it tends to ignore features that
aren't relevant.

However, we sometimes have several features that are a highly correlated. In
these cases, the lasso might ignore all but one of them.

How about L2, then? With ridge regression, we want to minimize the same
expression as above, but subject to $$\sum_{j=1}^{p} \beta_j^2 \leq t^2$$. This
means that the weights will fall within this region:

!! -- picture --!!


## Why bother with just L1 or L2 alone, then?

There is [some debate](http://stats.stackexchange.com/a/184031) over whether
elastic net regularization is always preferred to plain old L1 or L2.  One
argument is that you might as well use an elastic net model, since you'll end
up with the model that's best supported by your data anyway. If it turns out
that the best value of $$\alpha$$ is 0 or 1, then you know that your data supports
a ridge or lasso model best. If, however, you find that $$0 < \alpha < 1$$, then
that's the model that your data supports and you would've missed this if you
just tried to fit an L1 or L2 model. If you don't try the elastic net, you
might miss a model that's closer to the ground truth.

The problem is that if we continue with this line of reasoning, we might as
well add more $$L_q$$ norms to the cost function such that our penalty looks
like $$\alpha ||w||_1 + \gamma ||w||_2 + (1 - \alpha - \gamma) ||w||_3$$ , or
something similar (perhaps with even more norms). It's probably not a good idea
to complicate your model if you don't know why you're doing it!


## Further reading

*The Elements of Statistical Learning* has a good
explanation of the elastic net in chapters 3 and 18. This isn't
surprising, since one of the authors (Trevor Hastie) is the co-inventor of this
form of regularization!

The original paper, *[Regularization and variable selection via the Elastic
Net] (http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.124.4696)*, is
also worth reading.


<script type="text/javascript" async src="/static/js/MathJax/MathJax.js?config=TeX-MML-AM_CHTML"></script>
