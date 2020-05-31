![image](https://user-images.githubusercontent.com/5300774/83358530-786a7d00-a374-11ea-8172-ef8447362a07.png)

This script works with Joplin App (https://joplinapp.org/) an opensource note taking utility.

This script assigns every note a tag with the same title (slugified version).
That allows us create bidirectional links between different notes, as n:n relations, **in order to achieve similar relations as Roam Research**, which implements Zettelkasten knowledge management method (Niklas Luhmann).

Optionally you can ser NOTEBOOK env var to limit the tag creation to one joplin notebook.

First of all, create a .env file with following content:

```
API_KEY=xxxxxxxxxxxx
NOTEBOOK=folder (optional)
```

# Get Authorization token
Go Joplin > Tools > Options
![image](https://user-images.githubusercontent.com/5300774/83358479-245f9880-a374-11ea-8951-a9e837cc2012.png)

# Changes on userchrome.css
Just for allowing many more tags and longer, I recommend to add this css line applied to tag list:
```
.tag-list {
  overflow-x: auto;
}
```

That's the result:
![Peek 2020-05-31 19-47](https://user-images.githubusercontent.com/5300774/83359006-a4d3c880-a377-11ea-8833-4f04a9667456.gif)