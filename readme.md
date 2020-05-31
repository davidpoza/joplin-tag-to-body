This script works with Joplin App (https://joplinapp.org/) an opensource note taking utility.

This script assigns every note a tag with the same title (slugified version).
That allows us create bidirectional links between different notes, as n:n relations, in order to achieve similar relations as Roam Research, which implements Zettelkasten knowledge management method (Niklas Luhmann).

First of all, create a .env file with following content:

```
API_KEY=xxxxxxxxxxxx
```