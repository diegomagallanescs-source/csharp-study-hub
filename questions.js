const QUESTIONS = [
  {
    id: 1,
    title: "Builder with Hammer Types",
    difficulty: "Beginner",
    tags: ["Interface", "Dependency Injection", "Polymorphism"],
    description: `Design a tool system where a <strong>Builder</strong> uses different types of hammers to complete jobs.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IHammer</code> interface with:
   <ul><li><code>string Name { get; }</code> property</li>
   <li><code>int Power { get; }</code> property</li>
   <li><code>void Swing()</code> method</li></ul></li>
<li>Implement <code>RegularHammer</code> (Power = 5) and <code>SledgeHammer</code> (Power = 15)</li>
<li>Create a <code>Builder</code> class:
   <ul><li>Constructor accepts <code>IHammer hammer</code> (dependency injection)</li>
   <li><code>string Name { get; }</code> property</li>
   <li><code>IHammer CurrentHammer { get; private set; }</code></li>
   <li><code>void DoJob(string jobDescription)</code> — prints builder name, job, and swings hammer</li>
   <li><code>void SwitchHammer(IHammer newHammer)</code></li></ul></li>
<li>In a <code>Demo.Run()</code> static method, create both hammer types and a builder, do a job, switch hammer, do another job</li>
</ol>`,
    hint: "The key to dependency injection is passing the interface (IHammer) to the Builder constructor — not a concrete class. This way Builder doesn't care WHICH hammer it gets, only that it can Swing().",
    starterCode: `using System;

// 1. Create the IHammer interface
// 2. Implement RegularHammer and SledgeHammer
// 3. Create the Builder class with constructor injection
// 4. Write Demo.Run() to test it

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;

public interface IHammer
{
    string Name { get; }
    int Power { get; }
    void Swing();
}

public class RegularHammer : IHammer
{
    public string Name => "Regular Hammer";
    public int Power => 5;
    public void Swing() => Console.WriteLine($"[{Name}] Tap tap tap... (Power: {Power})");
}

public class SledgeHammer : IHammer
{
    public string Name => "Sledge Hammer";
    public int Power => 15;
    public void Swing() => Console.WriteLine($"[{Name}] BOOM! (Power: {Power})");
}

public class Builder
{
    public string Name { get; }
    public IHammer CurrentHammer { get; private set; }

    public Builder(string name, IHammer hammer)
    {
        Name = name;
        CurrentHammer = hammer;
    }

    public void DoJob(string jobDescription)
    {
        Console.WriteLine($"Builder {Name} is working on: {jobDescription}");
        CurrentHammer.Swing();
    }

    public void SwitchHammer(IHammer newHammer)
    {
        Console.WriteLine($"{Name} switched to {newHammer.Name}");
        CurrentHammer = newHammer;
    }
}

public class Demo
{
    public static void Run()
    {
        IHammer regular = new RegularHammer();
        IHammer sledge = new SledgeHammer();

        Builder bob = new Builder("Bob", regular);
        bob.DoJob("hanging a picture");

        bob.SwitchHammer(sledge);
        bob.DoJob("demolishing a wall");
    }
}`
  },
  {
    id: 2,
    title: "Animal Shelter",
    difficulty: "Beginner",
    tags: ["Interface", "List", "Polymorphism"],
    description: `Build an animal shelter system that manages different kinds of animals.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IAnimal</code> interface with:
   <ul><li><code>string Name { get; }</code></li>
   <li><code>string Species { get; }</code></li>
   <li><code>void Speak()</code></li></ul></li>
<li>Implement <code>Dog</code>, <code>Cat</code>, and <code>Bird</code> — each prints a unique sound in <code>Speak()</code></li>
<li>Create an <code>AnimalShelter</code> class:
   <ul><li>Private <code>List&lt;IAnimal&gt; _animals</code></li>
   <li><code>void Admit(IAnimal animal)</code></li>
   <li><code>bool Release(string name)</code> — returns false if not found</li>
   <li><code>void MakeAllSpeak()</code></li>
   <li><code>int Count { get; }</code> property</li></ul></li>
<li>In <code>Demo.Run()</code>, add 3 animals, make them speak, release one, verify count</li>
</ol>`,
    hint: "Store animals as List<IAnimal> — you can call Speak() on any element without knowing the concrete type. For Release(), use List.RemoveAll() or FindIndex() + RemoveAt().",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IAnimal interface
// 2. Dog, Cat, Bird classes
// 3. AnimalShelter class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IAnimal
{
    string Name { get; }
    string Species { get; }
    void Speak();
}

public class Dog : IAnimal
{
    public string Name { get; }
    public string Species => "Dog";
    public Dog(string name) => Name = name;
    public void Speak() => Console.WriteLine($"{Name} says: Woof!");
}

public class Cat : IAnimal
{
    public string Name { get; }
    public string Species => "Cat";
    public Cat(string name) => Name = name;
    public void Speak() => Console.WriteLine($"{Name} says: Meow!");
}

public class Bird : IAnimal
{
    public string Name { get; }
    public string Species => "Bird";
    public Bird(string name) => Name = name;
    public void Speak() => Console.WriteLine($"{Name} says: Tweet!");
}

public class AnimalShelter
{
    private List<IAnimal> _animals = new List<IAnimal>();

    public int Count => _animals.Count;

    public void Admit(IAnimal animal)
    {
        _animals.Add(animal);
        Console.WriteLine($"Admitted: {animal.Name} ({animal.Species})");
    }

    public bool Release(string name)
    {
        int removed = _animals.RemoveAll(a => a.Name == name);
        if (removed > 0)
            Console.WriteLine($"Released: {name}");
        else
            Console.WriteLine($"Not found: {name}");
        return removed > 0;
    }

    public void MakeAllSpeak()
    {
        foreach (IAnimal animal in _animals)
            animal.Speak();
    }
}

public class Demo
{
    public static void Run()
    {
        AnimalShelter shelter = new AnimalShelter();
        shelter.Admit(new Dog("Rex"));
        shelter.Admit(new Cat("Whiskers"));
        shelter.Admit(new Bird("Tweety"));

        Console.WriteLine($"Count: {shelter.Count}");
        shelter.MakeAllSpeak();

        shelter.Release("Whiskers");
        Console.WriteLine($"Count after release: {shelter.Count}");
    }
}`
  },
  {
    id: 3,
    title: "Async Text Pipeline",
    difficulty: "Beginner",
    tags: ["async/await", "Interface", "List"],
    description: `Build a text processing pipeline where processors run asynchronously in sequence.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>ITextProcessor</code> interface with:
   <ul><li><code>string Name { get; }</code></li>
   <li><code>Task&lt;string&gt; ProcessAsync(string input)</code></li></ul></li>
<li>Implement:
   <ul><li><code>UpperCaseProcessor</code> — converts to uppercase</li>
   <li><code>TrimProcessor</code> — trims whitespace</li>
   <li><code>ExclamationProcessor</code> — appends "!"</li></ul></li>
<li>Create a <code>TextPipeline</code> class:
   <ul><li>Constructor accepts <code>List&lt;ITextProcessor&gt; processors</code></li>
   <li><code>async Task&lt;string&gt; RunAsync(string input)</code> — chains all processors with <code>await</code></li>
   <li><code>void AddProcessor(ITextProcessor p)</code></li></ul></li>
<li>In <code>Demo.RunAsync()</code> (static async), create a pipeline with all 3 processors and run a sample string</li>
</ol>`,
    hint: "In RunAsync(), loop through _processors and reassign: result = await processor.ProcessAsync(result). Start with the input value. Use Task.FromResult() to wrap the sync return values.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. ITextProcessor interface
// 2. Three processor implementations
// 3. TextPipeline class

public class Demo
{
    public static async Task RunAsync()
    {
        // Test your implementation here
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ITextProcessor
{
    string Name { get; }
    Task<string> ProcessAsync(string input);
}

public class UpperCaseProcessor : ITextProcessor
{
    public string Name => "UpperCase";
    public Task<string> ProcessAsync(string input) => Task.FromResult(input.ToUpper());
}

public class TrimProcessor : ITextProcessor
{
    public string Name => "Trim";
    public Task<string> ProcessAsync(string input) => Task.FromResult(input.Trim());
}

public class ExclamationProcessor : ITextProcessor
{
    public string Name => "Exclamation";
    public Task<string> ProcessAsync(string input) => Task.FromResult(input + "!");
}

public class TextPipeline
{
    private List<ITextProcessor> _processors;

    public TextPipeline(List<ITextProcessor> processors)
    {
        _processors = processors;
    }

    public void AddProcessor(ITextProcessor p) => _processors.Add(p);

    public async Task<string> RunAsync(string input)
    {
        string result = input;
        foreach (ITextProcessor processor in _processors)
        {
            result = await processor.ProcessAsync(result);
            Console.WriteLine($"[{processor.Name}] => {result}");
        }
        return result;
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        List<ITextProcessor> processors = new List<ITextProcessor>
        {
            new TrimProcessor(),
            new UpperCaseProcessor(),
            new ExclamationProcessor()
        };

        TextPipeline pipeline = new TextPipeline(processors);
        string result = await pipeline.RunAsync("  hello world  ");
        Console.WriteLine($"Final result: {result}");
    }
}`
  },
  {
    id: 4,
    title: "Shopping Cart with Dictionary",
    difficulty: "Beginner",
    tags: ["Dictionary", "Null Coalescing ??", "Class"],
    description: `Implement a shopping cart that tracks items using a dictionary.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>Product</code> class with:
   <ul><li><code>string Id { get; }</code> (set in constructor)</li>
   <li><code>string Name { get; }</code></li>
   <li><code>decimal Price { get; }</code></li></ul></li>
<li>Create a <code>ShoppingCart</code> class:
   <ul><li>Private <code>Dictionary&lt;string, int&gt; _quantities</code> (key = product Id)</li>
   <li>Private <code>Dictionary&lt;string, Product&gt; _products</code></li>
   <li><code>void AddItem(Product product, int qty = 1)</code></li>
   <li><code>bool RemoveItem(string productId)</code></li>
   <li><code>int GetQuantity(string productId)</code> — return 0 if not found (use <code>??</code> or TryGetValue)</li>
   <li><code>decimal GetTotal()</code></li>
   <li><code>void PrintReceipt()</code></li></ul></li>
<li>Demonstrate in <code>Demo.Run()</code> with 3+ products</li>
</ol>`,
    hint: "For GetQuantity(), try: _quantities.TryGetValue(productId, out int qty) ? qty : 0.  For AddItem(), if the product already exists, increment the quantity — don't overwrite it.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. Product class
// 2. ShoppingCart class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public class Product
{
    public string Id { get; }
    public string Name { get; }
    public decimal Price { get; }

    public Product(string id, string name, decimal price)
    {
        Id = id;
        Name = name;
        Price = price;
    }
}

public class ShoppingCart
{
    private Dictionary<string, Product> _products = new Dictionary<string, Product>();
    private Dictionary<string, int> _quantities = new Dictionary<string, int>();

    public void AddItem(Product product, int qty = 1)
    {
        _products[product.Id] = product;
        _quantities[product.Id] = GetQuantity(product.Id) + qty;
        Console.WriteLine($"Added {qty}x {product.Name}");
    }

    public bool RemoveItem(string productId)
    {
        if (_products.Remove(productId))
        {
            _quantities.Remove(productId);
            return true;
        }
        return false;
    }

    public int GetQuantity(string productId) =>
        _quantities.TryGetValue(productId, out int qty) ? qty : 0;

    public decimal GetTotal()
    {
        decimal total = 0;
        foreach (string id in _products.Keys)
            total += _products[id].Price * _quantities[id];
        return total;
    }

    public void PrintReceipt()
    {
        Console.WriteLine("--- Receipt ---");
        foreach (string id in _products.Keys)
        {
            Product p = _products[id];
            int qty = _quantities[id];
            Console.WriteLine($"{p.Name} x{qty} @ ${p.Price:F2} = ${p.Price * qty:F2}");
        }
        Console.WriteLine($"Total: ${GetTotal():F2}");
    }
}

public class Demo
{
    public static void Run()
    {
        ShoppingCart cart = new ShoppingCart();
        cart.AddItem(new Product("p1", "Apple", 0.99m), 3);
        cart.AddItem(new Product("p2", "Bread", 2.49m));
        cart.AddItem(new Product("p3", "Milk", 3.99m), 2);
        cart.AddItem(new Product("p1", "Apple", 0.99m), 2); // adds 2 more apples

        Console.WriteLine($"Apples in cart: {cart.GetQuantity("p1")}");
        cart.PrintReceipt();
    }
}`
  },
  {
    id: 5,
    title: "Logging System with Static Counter",
    difficulty: "Beginner",
    tags: ["Interface", "static", "readonly"],
    description: `Build a logging system that tracks how many loggers have been created.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>ILogger</code> interface with:
   <ul><li><code>string LoggerName { get; }</code></li>
   <li><code>void Log(string message)</code></li>
   <li><code>void LogWarning(string message)</code></li>
   <li><code>void LogError(string message)</code></li></ul></li>
<li>Create a <code>BaseLogger</code> abstract class implementing <code>ILogger</code>:
   <ul><li><code>private static int _instanceCount = 0</code> (tracks all loggers ever created)</li>
   <li><code>public static int InstanceCount => _instanceCount</code></li>
   <li><code>public readonly string LoggerName</code> (set once in constructor)</li>
   <li>Constructor increments <code>_instanceCount</code></li></ul></li>
<li>Implement <code>ConsoleLogger</code> and <code>FileLogger</code> (FileLogger just simulates writing)</li>
<li>Create a <code>LogManager</code> class that holds a <code>List&lt;ILogger&gt;</code> and has <code>void BroadcastLog(string msg)</code></li>
</ol>`,
    hint: "static fields belong to the class, not the instance — so _instanceCount is shared across ALL BaseLogger instances. readonly fields can only be set in the constructor or at declaration.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. ILogger interface
// 2. BaseLogger abstract class (static counter + readonly name)
// 3. ConsoleLogger and FileLogger
// 4. LogManager

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface ILogger
{
    string LoggerName { get; }
    void Log(string message);
    void LogWarning(string message);
    void LogError(string message);
}

public abstract class BaseLogger : ILogger
{
    private static int _instanceCount = 0;
    public static int InstanceCount => _instanceCount;

    public readonly string LoggerName;

    string ILogger.LoggerName => LoggerName;

    protected BaseLogger(string name)
    {
        LoggerName = name;
        _instanceCount++;
    }

    public abstract void Log(string message);
    public void LogWarning(string message) => Log($"[WARN] {message}");
    public void LogError(string message) => Log($"[ERROR] {message}");
}

public class ConsoleLogger : BaseLogger
{
    public ConsoleLogger(string name) : base(name) { }

    public override void Log(string message) =>
        Console.WriteLine($"[{LoggerName}] {message}");
}

public class FileLogger : BaseLogger
{
    public readonly string FilePath;

    public FileLogger(string name, string filePath) : base(name)
    {
        FilePath = filePath;
    }

    public override void Log(string message) =>
        Console.WriteLine($"[{LoggerName} -> {FilePath}] {message}");
}

public class LogManager
{
    private List<ILogger> _loggers = new List<ILogger>();

    public void AddLogger(ILogger logger) => _loggers.Add(logger);

    public void BroadcastLog(string message)
    {
        foreach (ILogger logger in _loggers)
            logger.Log(message);
    }
}

public class Demo
{
    public static void Run()
    {
        ConsoleLogger console = new ConsoleLogger("Console");
        FileLogger file = new FileLogger("File", "app.log");

        Console.WriteLine($"Loggers created: {BaseLogger.InstanceCount}");

        LogManager manager = new LogManager();
        manager.AddLogger(console);
        manager.AddLogger(file);

        manager.BroadcastLog("Application started");
        console.LogWarning("Low memory");
        file.LogError("Disk full");
    }
}`
  },
  {
    id: 6,
    title: "Bank Account (async + const)",
    difficulty: "Intermediate",
    tags: ["async/await", "const", "Interface"],
    description: `Implement a banking system with two account types and async operations.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IBankAccount</code> interface with:
   <ul><li><code>string AccountNumber { get; }</code></li>
   <li><code>decimal Balance { get; }</code></li>
   <li><code>Task&lt;bool&gt; DepositAsync(decimal amount)</code></li>
   <li><code>Task&lt;bool&gt; WithdrawAsync(decimal amount)</code></li></ul></li>
<li>Create <code>SavingsAccount</code>:
   <ul><li><code>public const decimal MinBalance = 100m</code></li>
   <li>Withdraw fails if balance would fall below <code>MinBalance</code></li></ul></li>
<li>Create <code>CheckingAccount</code>:
   <ul><li><code>public const decimal OverdraftLimit = 50m</code></li>
   <li>Can go negative but not below <code>-OverdraftLimit</code></li></ul></li>
<li>Create a <code>Bank</code> class that holds a <code>Dictionary&lt;string, IBankAccount&gt;</code>, with <code>async Task Transfer(string fromId, string toId, decimal amount)</code></li>
</ol>`,
    hint: "Async methods that don't actually do async work can return Task.FromResult(). const is a compile-time constant — use it for fixed values like minimum balances. The Transfer method should await both Withdraw and Deposit.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. IBankAccount interface
// 2. SavingsAccount with const MinBalance
// 3. CheckingAccount with const OverdraftLimit
// 4. Bank class with async Transfer

public class Demo
{
    public static async Task RunAsync()
    {
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IBankAccount
{
    string AccountNumber { get; }
    decimal Balance { get; }
    Task<bool> DepositAsync(decimal amount);
    Task<bool> WithdrawAsync(decimal amount);
}

public class SavingsAccount : IBankAccount
{
    public const decimal MinBalance = 100m;
    public string AccountNumber { get; }
    public decimal Balance { get; private set; }

    public SavingsAccount(string accountNumber, decimal initialBalance)
    {
        AccountNumber = accountNumber;
        Balance = initialBalance;
    }

    public Task<bool> DepositAsync(decimal amount)
    {
        if (amount <= 0) return Task.FromResult(false);
        Balance += amount;
        return Task.FromResult(true);
    }

    public Task<bool> WithdrawAsync(decimal amount)
    {
        if (amount <= 0 || Balance - amount < MinBalance)
            return Task.FromResult(false);
        Balance -= amount;
        return Task.FromResult(true);
    }
}

public class CheckingAccount : IBankAccount
{
    public const decimal OverdraftLimit = 50m;
    public string AccountNumber { get; }
    public decimal Balance { get; private set; }

    public CheckingAccount(string accountNumber, decimal initialBalance)
    {
        AccountNumber = accountNumber;
        Balance = initialBalance;
    }

    public Task<bool> DepositAsync(decimal amount)
    {
        if (amount <= 0) return Task.FromResult(false);
        Balance += amount;
        return Task.FromResult(true);
    }

    public Task<bool> WithdrawAsync(decimal amount)
    {
        if (amount <= 0 || Balance - amount < -OverdraftLimit)
            return Task.FromResult(false);
        Balance -= amount;
        return Task.FromResult(true);
    }
}

public class Bank
{
    private Dictionary<string, IBankAccount> _accounts = new Dictionary<string, IBankAccount>();

    public void AddAccount(IBankAccount account) => _accounts[account.AccountNumber] = account;

    public async Task Transfer(string fromId, string toId, decimal amount)
    {
        if (!_accounts.TryGetValue(fromId, out IBankAccount from) ||
            !_accounts.TryGetValue(toId, out IBankAccount to))
        {
            Console.WriteLine("Account not found"); return;
        }
        bool success = await from.WithdrawAsync(amount);
        if (success)
        {
            await to.DepositAsync(amount);
            Console.WriteLine($"Transferred ${amount} from {fromId} to {toId}");
        }
        else
            Console.WriteLine($"Transfer failed — insufficient funds");
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        Bank bank = new Bank();
        bank.AddAccount(new SavingsAccount("S001", 500m));
        bank.AddAccount(new CheckingAccount("C001", 200m));

        await bank.Transfer("S001", "C001", 150m);
        await bank.Transfer("S001", "C001", 350m); // should fail — below MinBalance
    }
}`
  },
  {
    id: 7,
    title: "Student Grade Tracker",
    difficulty: "Beginner",
    tags: ["Dictionary", "readonly", "Interface"],
    description: `Build a student grade tracking system with a pluggable grade calculator.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IGradeCalculator</code> interface with:
   <ul><li><code>double Calculate(Dictionary&lt;string, int&gt; grades)</code></li>
   <li><code>string Label { get; }</code></li></ul></li>
<li>Implement <code>AverageCalculator</code> and <code>HighestScoreCalculator</code></li>
<li>Create a <code>Student</code> class:
   <ul><li><code>public readonly string StudentId</code></li>
   <li><code>public string Name { get; }</code></li>
   <li>Private <code>Dictionary&lt;string, int&gt; _grades</code></li>
   <li><code>void AddGrade(string subject, int score)</code></li>
   <li><code>double GetResult(IGradeCalculator calculator)</code></li>
   <li><code>void PrintReport(IGradeCalculator calculator)</code></li></ul></li>
<li>In <code>Demo.Run()</code>, create a student, add grades, print report using both calculators</li>
</ol>`,
    hint: "readonly means the field can only be assigned in the constructor — good for IDs that must never change. Dictionary iteration: foreach (var pair in _grades) gives you pair.Key and pair.Value.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// 1. IGradeCalculator interface
// 2. AverageCalculator and HighestScoreCalculator
// 3. Student class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Linq;

public interface IGradeCalculator
{
    string Label { get; }
    double Calculate(Dictionary<string, int> grades);
}

public class AverageCalculator : IGradeCalculator
{
    public string Label => "Average";
    public double Calculate(Dictionary<string, int> grades)
    {
        if (grades.Count == 0) return 0;
        int total = 0;
        foreach (int score in grades.Values) total += score;
        return (double)total / grades.Count;
    }
}

public class HighestScoreCalculator : IGradeCalculator
{
    public string Label => "Highest Score";
    public double Calculate(Dictionary<string, int> grades)
    {
        if (grades.Count == 0) return 0;
        int max = int.MinValue;
        foreach (int score in grades.Values)
            if (score > max) max = score;
        return max;
    }
}

public class Student
{
    public readonly string StudentId;
    public string Name { get; }
    private Dictionary<string, int> _grades = new Dictionary<string, int>();

    public Student(string studentId, string name)
    {
        StudentId = studentId;
        Name = name;
    }

    public void AddGrade(string subject, int score) => _grades[subject] = score;

    public double GetResult(IGradeCalculator calculator) => calculator.Calculate(_grades);

    public void PrintReport(IGradeCalculator calculator)
    {
        Console.WriteLine($"--- Report for {Name} (ID: {StudentId}) ---");
        foreach (var pair in _grades)
            Console.WriteLine($"  {pair.Key}: {pair.Value}");
        Console.WriteLine($"{calculator.Label}: {GetResult(calculator):F1}");
    }
}

public class Demo
{
    public static void Run()
    {
        Student student = new Student("S-001", "Alice");
        student.AddGrade("Math", 88);
        student.AddGrade("Science", 92);
        student.AddGrade("English", 75);
        student.AddGrade("History", 85);

        student.PrintReport(new AverageCalculator());
        student.PrintReport(new HighestScoreCalculator());
    }
}`
  },
  {
    id: 8,
    title: "Vehicle Garage",
    difficulty: "Beginner",
    tags: ["Interface", "List", "Polymorphism"],
    description: `Create a vehicle management system for a garage.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IVehicle</code> interface with:
   <ul><li><code>string Make { get; }</code></li>
   <li><code>string Model { get; }</code></li>
   <li><code>int MaxSpeedKph { get; }</code></li>
   <li><code>void Drive()</code></li></ul></li>
<li>Implement <code>Car</code>, <code>Truck</code>, and <code>Motorcycle</code> — each has a unique <code>Drive()</code> message</li>
<li>Create a <code>Garage</code> class:
   <ul><li>Private <code>List&lt;IVehicle&gt; _vehicles</code></li>
   <li><code>void Park(IVehicle vehicle)</code></li>
   <li><code>IVehicle FindFastest()</code> — returns the vehicle with highest <code>MaxSpeedKph</code></li>
   <li><code>List&lt;IVehicle&gt; GetByMinSpeed(int minSpeed)</code></li>
   <li><code>void DriveAll()</code></li></ul></li>
<li>Demo: park 4 vehicles, find fastest, filter by speed</li>
</ol>`,
    hint: "FindFastest() can loop through _vehicles tracking the current max. GetByMinSpeed() builds a new List<IVehicle> with a foreach and an if condition — or use LINQ's Where() if you prefer.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IVehicle interface
// 2. Car, Truck, Motorcycle
// 3. Garage class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IVehicle
{
    string Make { get; }
    string Model { get; }
    int MaxSpeedKph { get; }
    void Drive();
}

public class Car : IVehicle
{
    public string Make { get; }
    public string Model { get; }
    public int MaxSpeedKph { get; }
    public Car(string make, string model, int maxSpeed) { Make = make; Model = model; MaxSpeedKph = maxSpeed; }
    public void Drive() => Console.WriteLine($"Car {Make} {Model} is cruising at up to {MaxSpeedKph} km/h");
}

public class Truck : IVehicle
{
    public string Make { get; }
    public string Model { get; }
    public int MaxSpeedKph { get; }
    public Truck(string make, string model, int maxSpeed) { Make = make; Model = model; MaxSpeedKph = maxSpeed; }
    public void Drive() => Console.WriteLine($"Truck {Make} {Model} is hauling at {MaxSpeedKph} km/h");
}

public class Motorcycle : IVehicle
{
    public string Make { get; }
    public string Model { get; }
    public int MaxSpeedKph { get; }
    public Motorcycle(string make, string model, int maxSpeed) { Make = make; Model = model; MaxSpeedKph = maxSpeed; }
    public void Drive() => Console.WriteLine($"Motorcycle {Make} {Model} is racing at {MaxSpeedKph} km/h!");
}

public class Garage
{
    private List<IVehicle> _vehicles = new List<IVehicle>();

    public void Park(IVehicle vehicle)
    {
        _vehicles.Add(vehicle);
        Console.WriteLine($"Parked: {vehicle.Make} {vehicle.Model}");
    }

    public IVehicle FindFastest()
    {
        if (_vehicles.Count == 0) return null;
        IVehicle fastest = _vehicles[0];
        foreach (IVehicle v in _vehicles)
            if (v.MaxSpeedKph > fastest.MaxSpeedKph) fastest = v;
        return fastest;
    }

    public List<IVehicle> GetByMinSpeed(int minSpeed)
    {
        List<IVehicle> result = new List<IVehicle>();
        foreach (IVehicle v in _vehicles)
            if (v.MaxSpeedKph >= minSpeed) result.Add(v);
        return result;
    }

    public void DriveAll() { foreach (IVehicle v in _vehicles) v.Drive(); }
}

public class Demo
{
    public static void Run()
    {
        Garage garage = new Garage();
        garage.Park(new Car("Toyota", "Camry", 180));
        garage.Park(new Truck("Ford", "F-150", 160));
        garage.Park(new Motorcycle("Honda", "CBR", 250));
        garage.Park(new Car("BMW", "M3", 290));

        IVehicle fastest = garage.FindFastest();
        Console.WriteLine($"Fastest: {fastest.Make} {fastest.Model} at {fastest.MaxSpeedKph} km/h");

        List<IVehicle> fast = garage.GetByMinSpeed(200);
        Console.WriteLine($"Vehicles over 200 km/h: {fast.Count}");
        garage.DriveAll();
    }
}`
  },
  {
    id: 9,
    title: "Notification System",
    difficulty: "Beginner",
    tags: ["Interface", "List", "Polymorphism"],
    description: `Create a multi-channel notification system.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>INotifier</code> interface with:
   <ul><li><code>string ChannelName { get; }</code></li>
   <li><code>bool IsEnabled { get; set; }</code></li>
   <li><code>void Send(string recipient, string message)</code></li></ul></li>
<li>Implement <code>EmailNotifier</code>, <code>SmsNotifier</code>, and <code>PushNotifier</code></li>
<li>Create a <code>NotificationService</code>:
   <ul><li>Private <code>List&lt;INotifier&gt; _notifiers</code></li>
   <li><code>void Register(INotifier notifier)</code></li>
   <li><code>void SendAll(string recipient, string message)</code> — only sends via enabled notifiers</li>
   <li><code>void SetEnabled(string channelName, bool enabled)</code></li>
   <li><code>int EnabledCount { get; }</code></li></ul></li>
<li>Demo: register all 3, disable SMS, send a notification, verify only 2 channels fire</li>
</ol>`,
    hint: "In SendAll(), check IsEnabled before calling Send(). For SetEnabled(), loop through _notifiers and find the one matching channelName. EnabledCount can use a foreach counting enabled ones.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. INotifier interface
// 2. EmailNotifier, SmsNotifier, PushNotifier
// 3. NotificationService

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface INotifier
{
    string ChannelName { get; }
    bool IsEnabled { get; set; }
    void Send(string recipient, string message);
}

public class EmailNotifier : INotifier
{
    public string ChannelName => "Email";
    public bool IsEnabled { get; set; } = true;
    public void Send(string recipient, string message) =>
        Console.WriteLine($"[Email -> {recipient}]: {message}");
}

public class SmsNotifier : INotifier
{
    public string ChannelName => "SMS";
    public bool IsEnabled { get; set; } = true;
    public void Send(string recipient, string message) =>
        Console.WriteLine($"[SMS -> {recipient}]: {message}");
}

public class PushNotifier : INotifier
{
    public string ChannelName => "Push";
    public bool IsEnabled { get; set; } = true;
    public void Send(string recipient, string message) =>
        Console.WriteLine($"[Push -> {recipient}]: {message}");
}

public class NotificationService
{
    private List<INotifier> _notifiers = new List<INotifier>();

    public void Register(INotifier notifier) => _notifiers.Add(notifier);

    public void SendAll(string recipient, string message)
    {
        foreach (INotifier n in _notifiers)
            if (n.IsEnabled) n.Send(recipient, message);
    }

    public void SetEnabled(string channelName, bool enabled)
    {
        foreach (INotifier n in _notifiers)
            if (n.ChannelName == channelName) n.IsEnabled = enabled;
    }

    public int EnabledCount
    {
        get
        {
            int count = 0;
            foreach (INotifier n in _notifiers)
                if (n.IsEnabled) count++;
            return count;
        }
    }
}

public class Demo
{
    public static void Run()
    {
        NotificationService service = new NotificationService();
        service.Register(new EmailNotifier());
        service.Register(new SmsNotifier());
        service.Register(new PushNotifier());

        service.SendAll("alice@example.com", "Welcome!");
        Console.WriteLine($"Enabled channels: {service.EnabledCount}");

        service.SetEnabled("SMS", false);
        Console.WriteLine("--- After disabling SMS ---");
        service.SendAll("alice@example.com", "Your order shipped");
        Console.WriteLine($"Enabled channels: {service.EnabledCount}");
    }
}`
  },
  {
    id: 10,
    title: "Null-Safe User Profile",
    difficulty: "Beginner",
    tags: ["?? Null Coalescing", "??= Null Assignment", "Nullable Types"],
    description: `Practice using the <code>??</code> and <code>??=</code> operators with nullable fields.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>UserProfile</code> class:
   <ul><li>Nullable properties: <code>string? DisplayName</code>, <code>string? Email</code>, <code>string? PhoneNumber</code>, <code>string? Bio</code></li>
   <li><code>string GetDisplayName()</code> — returns DisplayName ?? "Anonymous"</li>
   <li><code>string GetContactInfo()</code> — returns Email ?? PhoneNumber ?? "No contact info"</li>
   <li><code>void EnsureDefaults()</code> — uses <code>??=</code> to set defaults if null</li>
   <li><code>void PrintProfile()</code></li></ul></li>
<li>Create an <code>IProfileRepository</code> interface with <code>UserProfile? GetById(int id)</code></li>
<li>Create <code>InMemoryProfileRepo</code> with a <code>Dictionary&lt;int, UserProfile&gt;</code></li>
<li>In <code>Demo.Run()</code>, fetch a profile that might be null, use <code>??</code> to provide a default, call <code>EnsureDefaults()</code></li>
</ol>`,
    hint: "??= is shorthand for: if (field == null) field = value. So Bio ??= \"No bio provided\" sets Bio only if it's currently null. Chain multiple ?? operators: a ?? b ?? c returns the first non-null.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. UserProfile class with nullable properties
// 2. IProfileRepository interface
// 3. InMemoryProfileRepo

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public class UserProfile
{
    public int Id { get; set; }
    public string? DisplayName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Bio { get; set; }

    public string GetDisplayName() => DisplayName ?? "Anonymous";

    public string GetContactInfo() => Email ?? PhoneNumber ?? "No contact info";

    public void EnsureDefaults()
    {
        DisplayName ??= "Anonymous";
        Bio ??= "No bio provided";
    }

    public void PrintProfile()
    {
        Console.WriteLine($"Name: {GetDisplayName()}");
        Console.WriteLine($"Contact: {GetContactInfo()}");
        Console.WriteLine($"Bio: {Bio ?? "(empty)"}");
    }
}

public interface IProfileRepository
{
    UserProfile? GetById(int id);
    void Save(UserProfile profile);
}

public class InMemoryProfileRepo : IProfileRepository
{
    private Dictionary<int, UserProfile> _store = new Dictionary<int, UserProfile>();

    public void Save(UserProfile profile) => _store[profile.Id] = profile;

    public UserProfile? GetById(int id) =>
        _store.TryGetValue(id, out UserProfile? profile) ? profile : null;
}

public class Demo
{
    public static void Run()
    {
        InMemoryProfileRepo repo = new InMemoryProfileRepo();
        repo.Save(new UserProfile { Id = 1, Email = "alice@example.com" });

        UserProfile profile1 = repo.GetById(1) ?? new UserProfile();
        profile1.EnsureDefaults();
        profile1.PrintProfile();

        Console.WriteLine("---");

        UserProfile profile2 = repo.GetById(99) ?? new UserProfile { Id = 99, DisplayName = "Guest" };
        profile2.EnsureDefaults();
        profile2.PrintProfile();
    }
}`
  },
  {
    id: 11,
    title: "Generic Stack",
    difficulty: "Intermediate",
    tags: ["Generics", "Interface", "private/public"],
    description: `Implement a generic stack data structure.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IStack&lt;T&gt;</code> interface with:
   <ul><li><code>void Push(T item)</code></li>
   <li><code>T Pop()</code> — throws if empty</li>
   <li><code>T Peek()</code> — returns top without removing</li>
   <li><code>bool IsEmpty { get; }</code></li>
   <li><code>int Count { get; }</code></li></ul></li>
<li>Implement <code>SimpleStack&lt;T&gt;</code>:
   <ul><li>Private <code>List&lt;T&gt; _items</code></li>
   <li>Public properties, private backing list</li>
   <li>Pop/Peek throw <code>InvalidOperationException</code> when empty</li></ul></li>
<li>Create a static <code>StackFactory</code> class with <code>static SimpleStack&lt;T&gt; Create&lt;T&gt;()</code></li>
<li>Demo: push 5 ints, peek at top, pop all, try popping empty stack and catch the exception</li>
</ol>`,
    hint: "For a stack, Push adds to the end of the list, Pop removes from the end (_items[Count-1] then RemoveAt(Count-1)). static generic method: public static SimpleStack<T> Create<T>() => new SimpleStack<T>();",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IStack<T> interface
// 2. SimpleStack<T> implementation
// 3. StackFactory static class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IStack<T>
{
    void Push(T item);
    T Pop();
    T Peek();
    bool IsEmpty { get; }
    int Count { get; }
}

public class SimpleStack<T> : IStack<T>
{
    private List<T> _items = new List<T>();

    public bool IsEmpty => _items.Count == 0;
    public int Count => _items.Count;

    public void Push(T item) => _items.Add(item);

    public T Pop()
    {
        if (IsEmpty) throw new InvalidOperationException("Stack is empty");
        T item = _items[Count - 1];
        _items.RemoveAt(Count - 1);
        return item;
    }

    public T Peek()
    {
        if (IsEmpty) throw new InvalidOperationException("Stack is empty");
        return _items[Count - 1];
    }
}

public static class StackFactory
{
    public static SimpleStack<T> Create<T>() => new SimpleStack<T>();
}

public class Demo
{
    public static void Run()
    {
        IStack<int> stack = StackFactory.Create<int>();

        for (int i = 1; i <= 5; i++) stack.Push(i * 10);

        Console.WriteLine($"Top: {stack.Peek()}, Count: {stack.Count}");

        while (!stack.IsEmpty)
            Console.WriteLine($"Popped: {stack.Pop()}");

        try
        {
            stack.Pop(); // should throw
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Caught: {ex.Message}");
        }
    }
}`
  },
  {
    id: 12,
    title: "Recipe Book",
    difficulty: "Beginner",
    tags: ["readonly", "List", "Dictionary", "Interface"],
    description: `Build a recipe management system with an in-memory repository.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>Recipe</code> class:
   <ul><li><code>public readonly string Id</code></li>
   <li><code>public string Title { get; }</code></li>
   <li><code>public List&lt;string&gt; Ingredients { get; }</code> (initialize in constructor)</li>
   <li><code>public Dictionary&lt;int, string&gt; Steps { get; }</code> (step number → description)</li>
   <li><code>void AddIngredient(string ingredient)</code></li>
   <li><code>void AddStep(string stepDescription)</code> — auto-numbers from 1</li></ul></li>
<li>Create <code>IRecipeRepository</code> with Add, GetById, GetAll, Delete</li>
<li>Implement <code>InMemoryRecipeRepository</code> using <code>Dictionary&lt;string, Recipe&gt;</code></li>
<li>Demo: create 2 recipes with steps/ingredients, save, retrieve, list all titles</li>
</ol>`,
    hint: "For AddStep(), the next step number is Steps.Count + 1. readonly means the Id reference can't be reassigned after construction — but List and Dictionary contents can still be modified. readonly != immutable.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. Recipe class (readonly Id, List ingredients, Dictionary steps)
// 2. IRecipeRepository interface
// 3. InMemoryRecipeRepository

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public class Recipe
{
    public readonly string Id;
    public string Title { get; }
    public List<string> Ingredients { get; } = new List<string>();
    public Dictionary<int, string> Steps { get; } = new Dictionary<int, string>();

    public Recipe(string id, string title)
    {
        Id = id;
        Title = title;
    }

    public void AddIngredient(string ingredient) => Ingredients.Add(ingredient);

    public void AddStep(string stepDescription) => Steps[Steps.Count + 1] = stepDescription;

    public void Print()
    {
        Console.WriteLine($"Recipe: {Title} (ID: {Id})");
        Console.WriteLine("Ingredients: " + string.Join(", ", Ingredients));
        foreach (var step in Steps)
            Console.WriteLine($"  Step {step.Key}: {step.Value}");
    }
}

public interface IRecipeRepository
{
    void Add(Recipe recipe);
    Recipe? GetById(string id);
    List<Recipe> GetAll();
    bool Delete(string id);
}

public class InMemoryRecipeRepository : IRecipeRepository
{
    private Dictionary<string, Recipe> _store = new Dictionary<string, Recipe>();

    public void Add(Recipe recipe) => _store[recipe.Id] = recipe;

    public Recipe? GetById(string id) =>
        _store.TryGetValue(id, out Recipe? r) ? r : null;

    public List<Recipe> GetAll() => new List<Recipe>(_store.Values);

    public bool Delete(string id) => _store.Remove(id);
}

public class Demo
{
    public static void Run()
    {
        InMemoryRecipeRepository repo = new InMemoryRecipeRepository();

        Recipe pasta = new Recipe("r1", "Spaghetti Carbonara");
        pasta.AddIngredient("spaghetti");
        pasta.AddIngredient("eggs");
        pasta.AddIngredient("bacon");
        pasta.AddStep("Boil pasta");
        pasta.AddStep("Fry bacon");
        pasta.AddStep("Mix eggs and combine");
        repo.Add(pasta);

        Recipe salad = new Recipe("r2", "Caesar Salad");
        salad.AddIngredient("romaine lettuce");
        salad.AddIngredient("croutons");
        salad.AddStep("Wash lettuce");
        salad.AddStep("Add dressing and toss");
        repo.Add(salad);

        foreach (Recipe r in repo.GetAll())
            r.Print();

        repo.Delete("r1");
        Console.WriteLine($"After delete, count: {repo.GetAll().Count}");
    }
}`
  },
  {
    id: 13,
    title: "Async Weather Dashboard",
    difficulty: "Intermediate",
    tags: ["async/await", "Interface", "List"],
    description: `Build a weather dashboard that fetches data from multiple async sources.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>WeatherReport</code> class with <code>string City</code>, <code>double TempCelsius</code>, <code>string Condition</code></li>
<li>Create an <code>IWeatherService</code> interface with:
   <ul><li><code>string ServiceName { get; }</code></li>
   <li><code>Task&lt;WeatherReport&gt; GetWeatherAsync(string city)</code></li></ul></li>
<li>Implement <code>MockWeatherService</code> — simulates async with <code>Task.Delay(100)</code> and returns random-ish data</li>
<li>Create a <code>WeatherDashboard</code> class:
   <ul><li>Constructor accepts <code>List&lt;IWeatherService&gt; services</code></li>
   <li><code>async Task&lt;List&lt;WeatherReport&gt;&gt; FetchAllAsync(string city)</code></li>
   <li><code>async Task PrintSummaryAsync(string city)</code> — prints all results</li></ul></li>
<li>Demo: fetch weather for "London" from 2 mock services</li>
</ol>`,
    hint: "In FetchAllAsync(), loop through services and await each one, adding results to a list. You could also use Task.WhenAll() for parallel fetching — try both! Task.Delay() simulates a real network call.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. WeatherReport class
// 2. IWeatherService interface
// 3. MockWeatherService
// 4. WeatherDashboard

public class Demo
{
    public static async Task RunAsync()
    {
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class WeatherReport
{
    public string City { get; set; }
    public double TempCelsius { get; set; }
    public string Condition { get; set; }
    public string Source { get; set; }
}

public interface IWeatherService
{
    string ServiceName { get; }
    Task<WeatherReport> GetWeatherAsync(string city);
}

public class MockWeatherService : IWeatherService
{
    private readonly int _tempOffset;
    public string ServiceName { get; }

    public MockWeatherService(string name, int tempOffset)
    {
        ServiceName = name;
        _tempOffset = tempOffset;
    }

    public async Task<WeatherReport> GetWeatherAsync(string city)
    {
        await Task.Delay(100); // simulate network
        return new WeatherReport
        {
            City = city,
            TempCelsius = 18.0 + _tempOffset,
            Condition = _tempOffset > 0 ? "Sunny" : "Cloudy",
            Source = ServiceName
        };
    }
}

public class WeatherDashboard
{
    private List<IWeatherService> _services;

    public WeatherDashboard(List<IWeatherService> services)
    {
        _services = services;
    }

    public async Task<List<WeatherReport>> FetchAllAsync(string city)
    {
        List<WeatherReport> results = new List<WeatherReport>();
        foreach (IWeatherService service in _services)
        {
            WeatherReport report = await service.GetWeatherAsync(city);
            results.Add(report);
        }
        return results;
    }

    public async Task PrintSummaryAsync(string city)
    {
        Console.WriteLine($"Weather for {city}:");
        List<WeatherReport> reports = await FetchAllAsync(city);
        foreach (WeatherReport r in reports)
            Console.WriteLine($"  [{r.Source}] {r.TempCelsius}°C - {r.Condition}");
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        List<IWeatherService> services = new List<IWeatherService>
        {
            new MockWeatherService("WeatherAPI", 2),
            new MockWeatherService("OpenWeather", -1)
        };

        WeatherDashboard dashboard = new WeatherDashboard(services);
        await dashboard.PrintSummaryAsync("London");
        await dashboard.PrintSummaryAsync("Tokyo");
    }
}`
  },
  {
    id: 14,
    title: "Unit Converter Service",
    difficulty: "Beginner",
    tags: ["const", "Dictionary", "Interface"],
    description: `Build a pluggable unit conversion service.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IUnitConverter</code> interface with:
   <ul><li><code>string FromUnit { get; }</code></li>
   <li><code>string ToUnit { get; }</code></li>
   <li><code>double Convert(double value)</code></li></ul></li>
<li>Implement three converters, each using a <code>const double</code> for the conversion factor:
   <ul><li><code>CelsiusToFahrenheit</code> — const factor = 9.0/5.0, add 32</li>
   <li><code>KgToPounds</code> — const factor = 2.20462</li>
   <li><code>KmToMiles</code> — const factor = 0.621371</li></ul></li>
<li>Create a <code>ConverterService</code>:
   <ul><li>Private <code>Dictionary&lt;string, IUnitConverter&gt;</code> — key = "from_to" e.g. "C_F"</li>
   <li><code>void Register(IUnitConverter converter)</code></li>
   <li><code>double? Convert(string fromUnit, string toUnit, double value)</code> — returns null if not found</li>
   <li><code>void PrintAllConversions(double value)</code></li></ul></li>
</ol>`,
    hint: "Build the dictionary key as $\"{converter.FromUnit}_{converter.ToUnit}\". For Convert(), use TryGetValue and return null if missing. const double means the compiler bakes the value in at compile time.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IUnitConverter interface
// 2. Three converters with const factors
// 3. ConverterService with Dictionary

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IUnitConverter
{
    string FromUnit { get; }
    string ToUnit { get; }
    double Convert(double value);
}

public class CelsiusToFahrenheit : IUnitConverter
{
    public const double Factor = 9.0 / 5.0;
    public string FromUnit => "C";
    public string ToUnit => "F";
    public double Convert(double value) => value * Factor + 32;
}

public class KgToPounds : IUnitConverter
{
    public const double Factor = 2.20462;
    public string FromUnit => "kg";
    public string ToUnit => "lbs";
    public double Convert(double value) => value * Factor;
}

public class KmToMiles : IUnitConverter
{
    public const double Factor = 0.621371;
    public string FromUnit => "km";
    public string ToUnit => "mi";
    public double Convert(double value) => value * Factor;
}

public class ConverterService
{
    private Dictionary<string, IUnitConverter> _converters = new Dictionary<string, IUnitConverter>();

    public void Register(IUnitConverter converter) =>
        _converters[$"{converter.FromUnit}_{converter.ToUnit}"] = converter;

    public double? Convert(string fromUnit, string toUnit, double value)
    {
        string key = $"{fromUnit}_{toUnit}";
        return _converters.TryGetValue(key, out IUnitConverter? c) ? c.Convert(value) : null;
    }

    public void PrintAllConversions(double value)
    {
        foreach (IUnitConverter c in _converters.Values)
            Console.WriteLine($"{value} {c.FromUnit} = {c.Convert(value):F4} {c.ToUnit}");
    }
}

public class Demo
{
    public static void Run()
    {
        ConverterService service = new ConverterService();
        service.Register(new CelsiusToFahrenheit());
        service.Register(new KgToPounds());
        service.Register(new KmToMiles());

        double? result = service.Convert("C", "F", 100);
        Console.WriteLine($"100°C = {result}°F");

        service.PrintAllConversions(50);

        double? missing = service.Convert("m", "ft", 10);
        Console.WriteLine($"m to ft result: {missing ?? -1} (null means not registered)");
    }
}`
  },
  {
    id: 15,
    title: "Todo Manager",
    difficulty: "Intermediate",
    tags: ["const", "static", "readonly", "Dictionary"],
    description: `Build a todo list manager that demonstrates <code>const</code>, <code>static</code>, and <code>readonly</code>.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>TodoItem</code> class:
   <ul><li><code>public const int MaxTitleLength = 100</code></li>
   <li><code>private static int _nextId = 1</code></li>
   <li><code>public readonly int Id</code> (assigned from <code>_nextId++</code> in constructor)</li>
   <li><code>public readonly DateTime CreatedAt</code></li>
   <li><code>public string Title { get; private set; }</code> (validate against MaxTitleLength)</li>
   <li><code>public bool IsCompleted { get; private set; }</code></li>
   <li><code>void Complete()</code>, <code>void UpdateTitle(string newTitle)</code></li></ul></li>
<li>Create <code>ITodoRepository</code> with CRUD methods</li>
<li>Implement <code>InMemoryTodoRepo</code> with <code>Dictionary&lt;int, TodoItem&gt;</code></li>
<li>Demo: add 3 items, complete one, update a title, list all</li>
</ol>`,
    hint: "static int _nextId means ALL TodoItem instances share this counter — each new item gets a unique auto-incrementing ID. readonly DateTime CreatedAt captures the exact moment of creation and can never be changed.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. TodoItem (const MaxTitleLength, static _nextId, readonly Id, readonly CreatedAt)
// 2. ITodoRepository interface
// 3. InMemoryTodoRepo

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public class TodoItem
{
    public const int MaxTitleLength = 100;
    private static int _nextId = 1;

    public readonly int Id;
    public readonly DateTime CreatedAt;
    public string Title { get; private set; }
    public bool IsCompleted { get; private set; }

    public TodoItem(string title)
    {
        if (title.Length > MaxTitleLength)
            throw new ArgumentException($"Title cannot exceed {MaxTitleLength} characters");
        Id = _nextId++;
        CreatedAt = DateTime.Now;
        Title = title;
        IsCompleted = false;
    }

    public void Complete() => IsCompleted = true;

    public void UpdateTitle(string newTitle)
    {
        if (newTitle.Length > MaxTitleLength)
            throw new ArgumentException($"Title cannot exceed {MaxTitleLength} characters");
        Title = newTitle;
    }

    public override string ToString() =>
        $"[{Id}] {(IsCompleted ? "✓" : "○")} {Title} (created: {CreatedAt:HH:mm:ss})";
}

public interface ITodoRepository
{
    void Add(TodoItem item);
    TodoItem? GetById(int id);
    List<TodoItem> GetAll();
    bool Delete(int id);
}

public class InMemoryTodoRepo : ITodoRepository
{
    private Dictionary<int, TodoItem> _store = new Dictionary<int, TodoItem>();

    public void Add(TodoItem item) => _store[item.Id] = item;
    public TodoItem? GetById(int id) => _store.TryGetValue(id, out TodoItem? t) ? t : null;
    public List<TodoItem> GetAll() => new List<TodoItem>(_store.Values);
    public bool Delete(int id) => _store.Remove(id);
}

public class Demo
{
    public static void Run()
    {
        InMemoryTodoRepo repo = new InMemoryTodoRepo();
        repo.Add(new TodoItem("Buy groceries"));
        repo.Add(new TodoItem("Write unit tests"));
        repo.Add(new TodoItem("Read a book"));

        repo.GetById(1)?.Complete();
        repo.GetById(2)?.UpdateTitle("Write unit tests and integration tests");

        foreach (TodoItem item in repo.GetAll())
            Console.WriteLine(item);

        Console.WriteLine($"Max title length allowed: {TodoItem.MaxTitleLength}");
    }
}`
  },
  {
    id: 16,
    title: "Shape Calculator",
    difficulty: "Beginner",
    tags: ["Interface", "abstract", "List", "Polymorphism"],
    description: `Build a shape collection that calculates areas and perimeters polymorphically.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IShape</code> interface with <code>string ShapeName { get; }</code>, <code>double Area()</code>, <code>double Perimeter()</code></li>
<li>Create an <code>abstract class BaseShape : IShape</code> with abstract Area/Perimeter and a virtual <code>Describe()</code> that prints name, area, perimeter</li>
<li>Implement (extending BaseShape):
   <ul><li><code>Circle</code> — takes radius; Area = π*r²; Perimeter = 2πr</li>
   <li><code>Rectangle</code> — takes width and height</li>
   <li><code>Triangle</code> — takes base and height (Area = 0.5*b*h); Perimeter takes 3 sides</li></ul></li>
<li>Create <code>ShapeCollection</code> with <code>List&lt;IShape&gt;</code>, <code>IShape GetLargestByArea()</code>, <code>double GetTotalArea()</code>, <code>void DescribeAll()</code></li>
</ol>`,
    hint: "abstract means the class can't be instantiated directly but can define abstract members that subclasses MUST implement. virtual means subclasses CAN override but don't have to. Math.PI is available in System.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IShape interface
// 2. BaseShape abstract class
// 3. Circle, Rectangle, Triangle
// 4. ShapeCollection

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IShape
{
    string ShapeName { get; }
    double Area();
    double Perimeter();
}

public abstract class BaseShape : IShape
{
    public abstract string ShapeName { get; }
    public abstract double Area();
    public abstract double Perimeter();

    public virtual void Describe()
    {
        Console.WriteLine($"{ShapeName}: Area={Area():F2}, Perimeter={Perimeter():F2}");
    }
}

public class Circle : BaseShape
{
    private readonly double _radius;
    public Circle(double radius) => _radius = radius;
    public override string ShapeName => "Circle";
    public override double Area() => Math.PI * _radius * _radius;
    public override double Perimeter() => 2 * Math.PI * _radius;
}

public class Rectangle : BaseShape
{
    private readonly double _width, _height;
    public Rectangle(double width, double height) { _width = width; _height = height; }
    public override string ShapeName => "Rectangle";
    public override double Area() => _width * _height;
    public override double Perimeter() => 2 * (_width + _height);
}

public class Triangle : BaseShape
{
    private readonly double _base, _height, _a, _b, _c;
    public Triangle(double b, double h, double sideA, double sideB, double sideC)
    { _base = b; _height = h; _a = sideA; _b = sideB; _c = sideC; }
    public override string ShapeName => "Triangle";
    public override double Area() => 0.5 * _base * _height;
    public override double Perimeter() => _a + _b + _c;
}

public class ShapeCollection
{
    private List<IShape> _shapes = new List<IShape>();

    public void Add(IShape shape) => _shapes.Add(shape);

    public IShape GetLargestByArea()
    {
        if (_shapes.Count == 0) return null;
        IShape largest = _shapes[0];
        foreach (IShape s in _shapes)
            if (s.Area() > largest.Area()) largest = s;
        return largest;
    }

    public double GetTotalArea()
    {
        double total = 0;
        foreach (IShape s in _shapes) total += s.Area();
        return total;
    }

    public void DescribeAll()
    {
        foreach (IShape s in _shapes)
            if (s is BaseShape bs) bs.Describe();
            else Console.WriteLine($"{s.ShapeName}: Area={s.Area():F2}");
    }
}

public class Demo
{
    public static void Run()
    {
        ShapeCollection collection = new ShapeCollection();
        collection.Add(new Circle(5));
        collection.Add(new Rectangle(4, 6));
        collection.Add(new Triangle(3, 4, 3, 4, 5));

        collection.DescribeAll();
        Console.WriteLine($"Total area: {collection.GetTotalArea():F2}");
        IShape largest = collection.GetLargestByArea();
        Console.WriteLine($"Largest: {largest.ShapeName} ({largest.Area():F2})");
    }
}`
  },
  {
    id: 17,
    title: "Product Inventory",
    difficulty: "Intermediate",
    tags: ["Interface", "Dictionary", "?? Null Coalescing"],
    description: `Build an inventory system for physical and digital products.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IProduct</code> interface with <code>string SKU { get; }</code>, <code>string Name { get; }</code>, <code>decimal Price { get; }</code>, <code>string GetDetails()</code></li>
<li>Implement <code>PhysicalProduct</code> (adds <code>double WeightKg</code> and <code>string WarehouseLocation</code>)</li>
<li>Implement <code>DigitalProduct</code> (adds <code>string DownloadUrl</code> and <code>long FileSizeBytes</code>)</li>
<li>Create an <code>Inventory</code> class:
   <ul><li>Private <code>Dictionary&lt;string, IProduct&gt; _items</code></li>
   <li><code>void AddProduct(IProduct product)</code></li>
   <li><code>IProduct? GetBySku(string sku)</code></li>
   <li><code>string GetProductName(string sku)</code> — use <code>??</code> to return "Unknown Product" if null</li>
   <li><code>decimal GetTotalValue(int[] quantities)</code> — takes parallel array of qtys</li>
   <li><code>List&lt;IProduct&gt; SearchByName(string term)</code></li></ul></li>
</ol>`,
    hint: "GetProductName: return GetBySku(sku)?.Name ?? \"Unknown Product\". The ?. is null-conditional (returns null if left side is null), then ?? provides the fallback. GetDetails() in each class should return type-specific info.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IProduct interface
// 2. PhysicalProduct and DigitalProduct
// 3. Inventory class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IProduct
{
    string SKU { get; }
    string Name { get; }
    decimal Price { get; }
    string GetDetails();
}

public class PhysicalProduct : IProduct
{
    public string SKU { get; }
    public string Name { get; }
    public decimal Price { get; }
    public double WeightKg { get; }
    public string WarehouseLocation { get; }

    public PhysicalProduct(string sku, string name, decimal price, double weight, string location)
    {
        SKU = sku; Name = name; Price = price;
        WeightKg = weight; WarehouseLocation = location;
    }

    public string GetDetails() =>
        $"Physical: {Name} | ${Price} | {WeightKg}kg @ {WarehouseLocation}";
}

public class DigitalProduct : IProduct
{
    public string SKU { get; }
    public string Name { get; }
    public decimal Price { get; }
    public string DownloadUrl { get; }
    public long FileSizeBytes { get; }

    public DigitalProduct(string sku, string name, decimal price, string url, long fileSize)
    {
        SKU = sku; Name = name; Price = price;
        DownloadUrl = url; FileSizeBytes = fileSize;
    }

    public string GetDetails() =>
        $"Digital: {Name} | ${Price} | {FileSizeBytes / 1024}KB @ {DownloadUrl}";
}

public class Inventory
{
    private Dictionary<string, IProduct> _items = new Dictionary<string, IProduct>();

    public void AddProduct(IProduct product) => _items[product.SKU] = product;

    public IProduct? GetBySku(string sku) =>
        _items.TryGetValue(sku, out IProduct? p) ? p : null;

    public string GetProductName(string sku) => GetBySku(sku)?.Name ?? "Unknown Product";

    public List<IProduct> SearchByName(string term)
    {
        List<IProduct> results = new List<IProduct>();
        foreach (IProduct p in _items.Values)
            if (p.Name.Contains(term, StringComparison.OrdinalIgnoreCase)) results.Add(p);
        return results;
    }
}

public class Demo
{
    public static void Run()
    {
        Inventory inv = new Inventory();
        inv.AddProduct(new PhysicalProduct("P001", "Wireless Mouse", 29.99m, 0.15, "A-12"));
        inv.AddProduct(new PhysicalProduct("P002", "Keyboard", 79.99m, 0.8, "B-03"));
        inv.AddProduct(new DigitalProduct("D001", "Photo Editor Pro", 49.99m, "https://dl.example.com/photo", 52428800));

        Console.WriteLine(inv.GetBySku("P001")?.GetDetails());
        Console.WriteLine(inv.GetProductName("D001"));
        Console.WriteLine(inv.GetProductName("XXXX")); // Unknown Product

        List<IProduct> found = inv.SearchByName("key");
        Console.WriteLine($"Search 'key': {found.Count} result(s)");
        foreach (IProduct p in found) Console.WriteLine($"  {p.GetDetails()}");
    }
}`
  },
  {
    id: 18,
    title: "Async Notification Queue",
    difficulty: "Intermediate",
    tags: ["async/await", "Interface", "List"],
    description: `Implement an async queue that processes notifications one by one.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>Notification</code> class with <code>string Type</code>, <code>string Recipient</code>, <code>string Message</code>, <code>DateTime QueuedAt</code></li>
<li>Create an <code>IAsyncHandler</code> interface with:
   <ul><li><code>bool CanHandle(string notificationType)</code></li>
   <li><code>Task HandleAsync(Notification notification)</code></li></ul></li>
<li>Implement <code>EmailHandler</code> (handles type "email") and <code>SmsHandler</code> (handles type "sms") — both simulate work with <code>Task.Delay(50)</code></li>
<li>Create a <code>NotificationQueue</code> class:
   <ul><li>Private <code>List&lt;Notification&gt; _queue</code> and <code>List&lt;IAsyncHandler&gt; _handlers</code></li>
   <li><code>void Enqueue(Notification n)</code></li>
   <li><code>void RegisterHandler(IAsyncHandler handler)</code></li>
   <li><code>async Task ProcessAllAsync()</code> — for each notification, find a handler and await it</li></ul></li>
</ol>`,
    hint: "In ProcessAllAsync(), loop through _queue, find the first handler where CanHandle(n.Type) is true, then await handler.HandleAsync(n). If no handler is found, log a warning. Clear the queue when done.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. Notification class
// 2. IAsyncHandler interface
// 3. EmailHandler and SmsHandler
// 4. NotificationQueue

public class Demo
{
    public static async Task RunAsync()
    {
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class Notification
{
    public string Type { get; set; }
    public string Recipient { get; set; }
    public string Message { get; set; }
    public DateTime QueuedAt { get; set; } = DateTime.Now;
}

public interface IAsyncHandler
{
    bool CanHandle(string notificationType);
    Task HandleAsync(Notification notification);
}

public class EmailHandler : IAsyncHandler
{
    public bool CanHandle(string type) => type == "email";
    public async Task HandleAsync(Notification n)
    {
        await Task.Delay(50);
        Console.WriteLine($"[Email] Sent to {n.Recipient}: {n.Message}");
    }
}

public class SmsHandler : IAsyncHandler
{
    public bool CanHandle(string type) => type == "sms";
    public async Task HandleAsync(Notification n)
    {
        await Task.Delay(50);
        Console.WriteLine($"[SMS] Sent to {n.Recipient}: {n.Message}");
    }
}

public class NotificationQueue
{
    private List<Notification> _queue = new List<Notification>();
    private List<IAsyncHandler> _handlers = new List<IAsyncHandler>();

    public void Enqueue(Notification n) => _queue.Add(n);
    public void RegisterHandler(IAsyncHandler handler) => _handlers.Add(handler);

    public async Task ProcessAllAsync()
    {
        Console.WriteLine($"Processing {_queue.Count} notifications...");
        foreach (Notification n in _queue)
        {
            bool handled = false;
            foreach (IAsyncHandler handler in _handlers)
            {
                if (handler.CanHandle(n.Type))
                {
                    await handler.HandleAsync(n);
                    handled = true;
                    break;
                }
            }
            if (!handled)
                Console.WriteLine($"[Warning] No handler for type: {n.Type}");
        }
        _queue.Clear();
        Console.WriteLine("Queue processed.");
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        NotificationQueue queue = new NotificationQueue();
        queue.RegisterHandler(new EmailHandler());
        queue.RegisterHandler(new SmsHandler());

        queue.Enqueue(new Notification { Type = "email", Recipient = "alice@example.com", Message = "Welcome!" });
        queue.Enqueue(new Notification { Type = "sms", Recipient = "+1234567890", Message = "Code: 4829" });
        queue.Enqueue(new Notification { Type = "push", Recipient = "device-xyz", Message = "New message" });

        await queue.ProcessAllAsync();
    }
}`
  },
  {
    id: 19,
    title: "Library Book System",
    difficulty: "Beginner",
    tags: ["readonly", "Dictionary", "Interface", "bool"],
    description: `Implement a library checkout system.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>Book</code> class:
   <ul><li><code>public readonly string ISBN</code></li>
   <li><code>public string Title { get; }</code></li>
   <li><code>public string Author { get; }</code></li>
   <li><code>public bool IsAvailable { get; private set; } = true</code></li>
   <li><code>public void CheckOut()</code> and <code>public void Return()</code> — toggle IsAvailable</li></ul></li>
<li>Create <code>ILibraryService</code> with CheckOut, Return, Search, GetAvailable</li>
<li>Implement <code>Library</code>:
   <ul><li><code>Dictionary&lt;string, Book&gt; _catalog</code> (key = ISBN)</li>
   <li><code>bool CheckOut(string isbn)</code> — fails if not available, returns false</li>
   <li><code>bool Return(string isbn)</code></li>
   <li><code>List&lt;Book&gt; SearchByAuthor(string author)</code></li>
   <li><code>List&lt;Book&gt; GetAvailable()</code></li></ul></li>
<li>Demo: add books, check one out, show available, return it</li>
</ol>`,
    hint: "Book.CheckOut() should set IsAvailable = false; Book.Return() sets it back to true. In Library.CheckOut(), first verify the book exists AND is available before calling book.CheckOut(). Return the bool result.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. Book class (readonly ISBN, bool IsAvailable)
// 2. ILibraryService interface
// 3. Library class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public class Book
{
    public readonly string ISBN;
    public string Title { get; }
    public string Author { get; }
    public bool IsAvailable { get; private set; } = true;

    public Book(string isbn, string title, string author)
    {
        ISBN = isbn; Title = title; Author = author;
    }

    public void CheckOut() => IsAvailable = false;
    public void Return() => IsAvailable = true;

    public override string ToString() =>
        $"[{(IsAvailable ? "Available" : "Checked Out")}] {Title} by {Author} (ISBN: {ISBN})";
}

public interface ILibraryService
{
    void AddBook(Book book);
    bool CheckOut(string isbn);
    bool Return(string isbn);
    List<Book> SearchByAuthor(string author);
    List<Book> GetAvailable();
}

public class Library : ILibraryService
{
    private Dictionary<string, Book> _catalog = new Dictionary<string, Book>();

    public void AddBook(Book book) => _catalog[book.ISBN] = book;

    public bool CheckOut(string isbn)
    {
        if (!_catalog.TryGetValue(isbn, out Book? book) || !book.IsAvailable)
            return false;
        book.CheckOut();
        Console.WriteLine($"Checked out: {book.Title}");
        return true;
    }

    public bool Return(string isbn)
    {
        if (!_catalog.TryGetValue(isbn, out Book? book) || book.IsAvailable)
            return false;
        book.Return();
        Console.WriteLine($"Returned: {book.Title}");
        return true;
    }

    public List<Book> SearchByAuthor(string author)
    {
        List<Book> results = new List<Book>();
        foreach (Book b in _catalog.Values)
            if (b.Author.Contains(author, StringComparison.OrdinalIgnoreCase)) results.Add(b);
        return results;
    }

    public List<Book> GetAvailable()
    {
        List<Book> results = new List<Book>();
        foreach (Book b in _catalog.Values)
            if (b.IsAvailable) results.Add(b);
        return results;
    }
}

public class Demo
{
    public static void Run()
    {
        Library lib = new Library();
        lib.AddBook(new Book("978-0-13-110362-7", "The C Programming Language", "Kernighan"));
        lib.AddBook(new Book("978-0-13-468599-1", "Clean Code", "Martin"));
        lib.AddBook(new Book("978-0-13-235088-4", "The Pragmatic Programmer", "Thomas"));

        Console.WriteLine($"Available: {lib.GetAvailable().Count}");
        lib.CheckOut("978-0-13-468599-1");
        Console.WriteLine($"Available after checkout: {lib.GetAvailable().Count}");

        lib.Return("978-0-13-468599-1");
        Console.WriteLine($"Available after return: {lib.GetAvailable().Count}");

        List<Book> found = lib.SearchByAuthor("Martin");
        foreach (Book b in found) Console.WriteLine(b);
    }
}`
  },
  {
    id: 20,
    title: "Caching Decorator",
    difficulty: "Intermediate",
    tags: ["Decorator Pattern", "Interface", "Dictionary", "??"],
    description: `Implement the decorator pattern with a caching layer.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IDataService</code> interface with:
   <ul><li><code>string GetData(string key)</code></li>
   <li><code>int CallCount { get; }</code></li></ul></li>
<li>Create <code>SlowDataService</code>: simulates slow work (just prints "Fetching..."), increments a counter, returns <code>$"Data for {key}"</code></li>
<li>Create <code>CachingDataService</code> (the decorator):
   <ul><li>Constructor accepts <code>IDataService inner</code></li>
   <li>Private <code>Dictionary&lt;string, string&gt; _cache</code></li>
   <li><code>GetData()</code> — check cache first, fall through to inner only on miss, use <code>??</code> or TryGetValue</li>
   <li><code>void InvalidateCache(string key)</code></li>
   <li><code>int CacheHits { get; private set; }</code></li></ul></li>
<li>Demo: fetch same keys multiple times, verify inner service is only called once per unique key</li>
</ol>`,
    hint: "The decorator wraps the real service — it has the same interface but adds behavior. In GetData(): check if _cache contains key, return cached value; otherwise call _inner.GetData(key), store in _cache, then return it.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IDataService interface
// 2. SlowDataService
// 3. CachingDataService (decorator pattern)

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IDataService
{
    string GetData(string key);
    int CallCount { get; }
}

public class SlowDataService : IDataService
{
    public int CallCount { get; private set; }

    public string GetData(string key)
    {
        Console.WriteLine($"[SlowDataService] Fetching '{key}'...");
        CallCount++;
        return $"Data for {key}";
    }
}

public class CachingDataService : IDataService
{
    private IDataService _inner;
    private Dictionary<string, string> _cache = new Dictionary<string, string>();

    public int CallCount => _inner.CallCount;
    public int CacheHits { get; private set; }

    public CachingDataService(IDataService inner) => _inner = inner;

    public string GetData(string key)
    {
        if (_cache.TryGetValue(key, out string? cached))
        {
            CacheHits++;
            Console.WriteLine($"[Cache HIT] '{key}'");
            return cached;
        }

        string result = _inner.GetData(key);
        _cache[key] = result;
        return result;
    }

    public void InvalidateCache(string key)
    {
        _cache.Remove(key);
        Console.WriteLine($"[Cache] Invalidated '{key}'");
    }
}

public class Demo
{
    public static void Run()
    {
        SlowDataService slow = new SlowDataService();
        CachingDataService cache = new CachingDataService(slow);

        cache.GetData("user:1");
        cache.GetData("user:2");
        cache.GetData("user:1"); // cache hit
        cache.GetData("user:1"); // cache hit
        cache.GetData("user:2"); // cache hit

        Console.WriteLine($"Inner service calls: {cache.CallCount}");
        Console.WriteLine($"Cache hits: {cache.CacheHits}");

        cache.InvalidateCache("user:1");
        cache.GetData("user:1"); // miss again
        Console.WriteLine($"Inner service calls after invalidation: {cache.CallCount}");
    }
}`
  },
  {
    id: 21,
    title: "Employee Payroll",
    difficulty: "Intermediate",
    tags: ["abstract", "virtual", "override", "const"],
    description: `Model an employee hierarchy with an abstract base class.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>abstract class Employee</code>:
   <ul><li><code>public readonly string EmployeeId</code></li>
   <li><code>public string Name { get; }</code></li>
   <li><code>public abstract decimal CalculatePay()</code></li>
   <li><code>public virtual string GetSummary()</code> — base version prints Name and pay</li></ul></li>
<li>Create <code>FullTimeEmployee</code>:
   <ul><li><code>public const decimal AnnualBonusRate = 0.10m</code></li>
   <li>Constructor takes annual salary</li>
   <li><code>CalculatePay()</code> = monthly salary (annual / 12)</li>
   <li>Override <code>GetSummary()</code> to include bonus info</li></ul></li>
<li>Create <code>PartTimeEmployee</code>: hourly rate × hours worked this month</li>
<li>Create <code>PayrollProcessor</code> with <code>List&lt;Employee&gt;</code>: <code>decimal GetTotalPayroll()</code>, <code>void PrintPayroll()</code>, <code>Employee GetHighestPaid()</code></li>
</ol>`,
    hint: "abstract means: 'I define the contract, subclass MUST fill it in.' virtual means: 'I have a default implementation but subclass CAN replace it.' override in the subclass actually replaces the virtual/abstract method.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. abstract Employee class
// 2. FullTimeEmployee (const bonus rate)
// 3. PartTimeEmployee (hourly)
// 4. PayrollProcessor

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public abstract class Employee
{
    public readonly string EmployeeId;
    public string Name { get; }

    protected Employee(string id, string name)
    {
        EmployeeId = id;
        Name = name;
    }

    public abstract decimal CalculatePay();

    public virtual string GetSummary() =>
        $"[{EmployeeId}] {Name} — Monthly Pay: ${CalculatePay():F2}";
}

public class FullTimeEmployee : Employee
{
    public const decimal AnnualBonusRate = 0.10m;
    private readonly decimal _annualSalary;

    public FullTimeEmployee(string id, string name, decimal annualSalary)
        : base(id, name) => _annualSalary = annualSalary;

    public override decimal CalculatePay() => _annualSalary / 12;

    public decimal GetMonthlyBonus() => CalculatePay() * AnnualBonusRate;

    public override string GetSummary() =>
        $"{base.GetSummary()} | Bonus: ${GetMonthlyBonus():F2} | Type: Full-Time";
}

public class PartTimeEmployee : Employee
{
    private readonly decimal _hourlyRate;
    private readonly int _hoursThisMonth;

    public PartTimeEmployee(string id, string name, decimal hourlyRate, int hoursThisMonth)
        : base(id, name)
    {
        _hourlyRate = hourlyRate;
        _hoursThisMonth = hoursThisMonth;
    }

    public override decimal CalculatePay() => _hourlyRate * _hoursThisMonth;

    public override string GetSummary() =>
        $"{base.GetSummary()} | {_hoursThisMonth}hrs @ ${_hourlyRate}/hr | Type: Part-Time";
}

public class PayrollProcessor
{
    private List<Employee> _employees = new List<Employee>();

    public void Add(Employee emp) => _employees.Add(emp);

    public decimal GetTotalPayroll()
    {
        decimal total = 0;
        foreach (Employee e in _employees) total += e.CalculatePay();
        return total;
    }

    public Employee GetHighestPaid()
    {
        if (_employees.Count == 0) return null;
        Employee top = _employees[0];
        foreach (Employee e in _employees)
            if (e.CalculatePay() > top.CalculatePay()) top = e;
        return top;
    }

    public void PrintPayroll()
    {
        Console.WriteLine("=== Payroll Report ===");
        foreach (Employee e in _employees) Console.WriteLine(e.GetSummary());
        Console.WriteLine($"Total: ${GetTotalPayroll():F2}");
    }
}

public class Demo
{
    public static void Run()
    {
        PayrollProcessor processor = new PayrollProcessor();
        processor.Add(new FullTimeEmployee("E001", "Alice", 72000m));
        processor.Add(new FullTimeEmployee("E002", "Bob", 60000m));
        processor.Add(new PartTimeEmployee("E003", "Charlie", 25m, 80));

        processor.PrintPayroll();
        Employee top = processor.GetHighestPaid();
        Console.WriteLine($"Highest paid: {top.Name}");
    }
}`
  },
  {
    id: 22,
    title: "Download Manager",
    difficulty: "Intermediate",
    tags: ["async/await", "Interface", "List"],
    description: `Build an async download manager with progress tracking.

<strong>Requirements:</strong>
<ol>
<li>Create a <code>DownloadResult</code> class with <code>string Url</code>, <code>bool Success</code>, <code>int BytesDownloaded</code>, <code>string? ErrorMessage</code></li>
<li>Create an <code>IDownloader</code> interface with <code>Task&lt;DownloadResult&gt; DownloadAsync(string url)</code></li>
<li>Create <code>MockDownloader</code>: simulates with <code>Task.Delay(200)</code>, succeeds for URLs starting with "https", fails otherwise. Returns appropriate <code>DownloadResult</code></li>
<li>Create <code>DownloadManager</code>:
   <ul><li>Constructor takes <code>IDownloader downloader</code></li>
   <li>Private <code>List&lt;string&gt; _queue</code></li>
   <li><code>void QueueUrl(string url)</code></li>
   <li><code>async Task&lt;List&lt;DownloadResult&gt;&gt; ProcessQueueAsync()</code></li>
   <li><code>void PrintReport(List&lt;DownloadResult&gt; results)</code></li></ul></li>
</ol>`,
    hint: "In ProcessQueueAsync(), foreach through _queue, await each download, add to results list. After processing, clear _queue. ErrorMessage is nullable (string?) — use ?? in PrintReport to show a fallback string.",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. DownloadResult class
// 2. IDownloader interface
// 3. MockDownloader
// 4. DownloadManager

public class Demo
{
    public static async Task RunAsync()
    {
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DownloadResult
{
    public string Url { get; set; }
    public bool Success { get; set; }
    public int BytesDownloaded { get; set; }
    public string? ErrorMessage { get; set; }
}

public interface IDownloader
{
    Task<DownloadResult> DownloadAsync(string url);
}

public class MockDownloader : IDownloader
{
    public async Task<DownloadResult> DownloadAsync(string url)
    {
        await Task.Delay(200);
        if (url.StartsWith("https"))
        {
            return new DownloadResult { Url = url, Success = true, BytesDownloaded = 1024 * 10 };
        }
        return new DownloadResult
        {
            Url = url,
            Success = false,
            BytesDownloaded = 0,
            ErrorMessage = "Insecure URL — only https is supported"
        };
    }
}

public class DownloadManager
{
    private IDownloader _downloader;
    private List<string> _queue = new List<string>();

    public DownloadManager(IDownloader downloader) => _downloader = downloader;

    public void QueueUrl(string url) => _queue.Add(url);

    public async Task<List<DownloadResult>> ProcessQueueAsync()
    {
        List<DownloadResult> results = new List<DownloadResult>();
        foreach (string url in _queue)
        {
            Console.WriteLine($"Downloading: {url}");
            DownloadResult result = await _downloader.DownloadAsync(url);
            results.Add(result);
        }
        _queue.Clear();
        return results;
    }

    public void PrintReport(List<DownloadResult> results)
    {
        Console.WriteLine("=== Download Report ===");
        foreach (DownloadResult r in results)
        {
            string status = r.Success
                ? $"OK — {r.BytesDownloaded} bytes"
                : $"FAILED — {r.ErrorMessage ?? "Unknown error"}";
            Console.WriteLine($"{r.Url}: {status}");
        }
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        DownloadManager manager = new DownloadManager(new MockDownloader());
        manager.QueueUrl("https://example.com/file1.zip");
        manager.QueueUrl("https://example.com/file2.pdf");
        manager.QueueUrl("http://insecure.com/bad.exe"); // will fail

        List<DownloadResult> results = await manager.ProcessQueueAsync();
        manager.PrintReport(results);
    }
}`
  },
  {
    id: 23,
    title: "Settings Provider Chain",
    difficulty: "Intermediate",
    tags: ["?? Null Coalescing", "Interface", "List"],
    description: `Implement a settings system where providers are checked in priority order.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>ISettingsProvider</code> interface with <code>string? GetValue(string key)</code> and <code>string ProviderName { get; }</code></li>
<li>Implement <code>DictionarySettingsProvider</code>: stores key/value pairs, returns null if missing</li>
<li>Implement <code>DefaultSettingsProvider</code>: always returns a default value (passed in constructor)</li>
<li>Create a <code>SettingsManager</code>:
   <ul><li>Constructor takes <code>List&lt;ISettingsProvider&gt; providers</code> (first in list = highest priority)</li>
   <li><code>string GetValue(string key)</code> — tries each provider in order, returns first non-null result. Uses <code>??</code> chaining or a loop</li>
   <li><code>string GetValue(string key, string fallback)</code> — uses <code>??</code> on the main result</li>
   <li><code>void PrintSource(string key)</code> — shows which provider answered</li></ul></li>
<li>Demo: chain env-like provider → user settings → defaults</li>
</ol>`,
    hint: "In GetValue(), loop through providers: result = provider.GetValue(key); if (result != null) return result. The last provider (DefaultSettingsProvider) ensures something is always returned. result ?? fallback returns fallback if result is null.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. ISettingsProvider interface
// 2. DictionarySettingsProvider and DefaultSettingsProvider
// 3. SettingsManager

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface ISettingsProvider
{
    string ProviderName { get; }
    string? GetValue(string key);
}

public class DictionarySettingsProvider : ISettingsProvider
{
    private Dictionary<string, string> _settings;
    public string ProviderName { get; }

    public DictionarySettingsProvider(string name, Dictionary<string, string> settings)
    {
        ProviderName = name;
        _settings = settings;
    }

    public string? GetValue(string key) =>
        _settings.TryGetValue(key, out string? val) ? val : null;
}

public class DefaultSettingsProvider : ISettingsProvider
{
    private string _defaultValue;
    public string ProviderName => "Defaults";

    public DefaultSettingsProvider(string defaultValue) => _defaultValue = defaultValue;
    public string? GetValue(string key) => _defaultValue;
}

public class SettingsManager
{
    private List<ISettingsProvider> _providers;

    public SettingsManager(List<ISettingsProvider> providers) => _providers = providers;

    public string? GetValue(string key)
    {
        foreach (ISettingsProvider provider in _providers)
        {
            string? result = provider.GetValue(key);
            if (result != null) return result;
        }
        return null;
    }

    public string GetValue(string key, string fallback) => GetValue(key) ?? fallback;

    public void PrintSource(string key)
    {
        foreach (ISettingsProvider provider in _providers)
        {
            string? result = provider.GetValue(key);
            if (result != null)
            {
                Console.WriteLine($"'{key}' = '{result}' (from: {provider.ProviderName})");
                return;
            }
        }
        Console.WriteLine($"'{key}' not found in any provider");
    }
}

public class Demo
{
    public static void Run()
    {
        DictionarySettingsProvider envSettings = new DictionarySettingsProvider("Environment",
            new Dictionary<string, string> { ["DB_HOST"] = "prod-db.internal", ["LOG_LEVEL"] = "warn" });

        DictionarySettingsProvider userSettings = new DictionarySettingsProvider("User Config",
            new Dictionary<string, string> { ["THEME"] = "dark", ["LOG_LEVEL"] = "debug" });

        DefaultSettingsProvider defaults = new DefaultSettingsProvider("(not set)");

        SettingsManager manager = new SettingsManager(new List<ISettingsProvider>
        {
            envSettings, userSettings, defaults
        });

        manager.PrintSource("DB_HOST");    // from Environment
        manager.PrintSource("THEME");      // from User Config
        manager.PrintSource("LOG_LEVEL");  // from Environment (higher priority)
        manager.PrintSource("FONT_SIZE");  // from Defaults

        string timeout = manager.GetValue("TIMEOUT", "30s");
        Console.WriteLine($"Timeout: {timeout}");
    }
}`
  },
  {
    id: 24,
    title: "RPG Character Inventory",
    difficulty: "Beginner",
    tags: ["Interface", "List", "Polymorphism"],
    description: `Build an RPG inventory system for a player character.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>IItem</code> interface with <code>string Name { get; }</code>, <code>string ItemType { get; }</code>, <code>int Value { get; }</code>, <code>string Use()</code></li>
<li>Implement three item types:
   <ul><li><code>Weapon</code>: has <code>int Damage</code> — Use() returns attack message</li>
   <li><code>Armor</code>: has <code>int Defense</code> — Use() returns equip message</li>
   <li><code>Potion</code>: has <code>int HealAmount</code> — Use() returns heal message</li></ul></li>
<li>Create a <code>Inventory</code> class:
   <ul><li>Private <code>List&lt;IItem&gt; _items</code></li>
   <li><code>void AddItem(IItem item)</code></li>
   <li><code>IItem? GetStrongest()</code> — among Weapons, find highest Damage using casting</li>
   <li><code>List&lt;IItem&gt; GetByType(string type)</code></li>
   <li><code>int GetTotalValue()</code></li>
   <li><code>void UseAll()</code> — calls Use() on each item and prints result</li></ul></li>
</ol>`,
    hint: "To access Weapon-specific properties like Damage, you need to cast: if (item is Weapon w) then use w.Damage. This is the 'pattern matching' style cast. GetStrongest() loops weapons and compares Damage values.",
    starterCode: `using System;
using System.Collections.Generic;

// 1. IItem interface
// 2. Weapon, Armor, Potion
// 3. Inventory class

public class Demo
{
    public static void Run()
    {
        // Test your implementation here
    }
}`,
    answer: `using System;
using System.Collections.Generic;

public interface IItem
{
    string Name { get; }
    string ItemType { get; }
    int Value { get; }
    string Use();
}

public class Weapon : IItem
{
    public string Name { get; }
    public string ItemType => "Weapon";
    public int Value { get; }
    public int Damage { get; }

    public Weapon(string name, int damage, int value) { Name = name; Damage = damage; Value = value; }
    public string Use() => $"Attack with {Name} for {Damage} damage!";
}

public class Armor : IItem
{
    public string Name { get; }
    public string ItemType => "Armor";
    public int Value { get; }
    public int Defense { get; }

    public Armor(string name, int defense, int value) { Name = name; Defense = defense; Value = value; }
    public string Use() => $"Equipped {Name} (+{Defense} defense)";
}

public class Potion : IItem
{
    public string Name { get; }
    public string ItemType => "Potion";
    public int Value { get; }
    public int HealAmount { get; }

    public Potion(string name, int heal, int value) { Name = name; HealAmount = heal; Value = value; }
    public string Use() => $"Drank {Name}, restored {HealAmount} HP!";
}

public class Inventory
{
    private List<IItem> _items = new List<IItem>();

    public void AddItem(IItem item)
    {
        _items.Add(item);
        Console.WriteLine($"Added: {item.Name} ({item.ItemType})");
    }

    public IItem? GetStrongest()
    {
        Weapon? strongest = null;
        foreach (IItem item in _items)
            if (item is Weapon w && (strongest == null || w.Damage > strongest.Damage))
                strongest = w;
        return strongest;
    }

    public List<IItem> GetByType(string type)
    {
        List<IItem> results = new List<IItem>();
        foreach (IItem item in _items)
            if (item.ItemType == type) results.Add(item);
        return results;
    }

    public int GetTotalValue()
    {
        int total = 0;
        foreach (IItem item in _items) total += item.Value;
        return total;
    }

    public void UseAll()
    {
        foreach (IItem item in _items) Console.WriteLine(item.Use());
    }
}

public class Demo
{
    public static void Run()
    {
        Inventory inv = new Inventory();
        inv.AddItem(new Weapon("Iron Sword", 25, 100));
        inv.AddItem(new Weapon("Flame Staff", 45, 300));
        inv.AddItem(new Armor("Chain Mail", 20, 150));
        inv.AddItem(new Potion("Health Potion", 50, 30));

        Console.WriteLine($"Total value: {inv.GetTotalValue()} gold");

        IItem? best = inv.GetStrongest();
        Console.WriteLine($"Strongest weapon: {best?.Name ?? "none"}");

        List<IItem> weapons = inv.GetByType("Weapon");
        Console.WriteLine($"Weapons count: {weapons.Count}");

        Console.WriteLine("--- Using all items ---");
        inv.UseAll();
    }
}`
  },
  {
    id: 25,
    title: "Order Checkout Pipeline",
    difficulty: "Intermediate",
    tags: ["async/await", "Interface", "readonly", "Dictionary"],
    description: `Implement an order checkout pipeline where multiple steps process an order in sequence.

<strong>Requirements:</strong>
<ol>
<li>Create an <code>Order</code> class:
   <ul><li><code>public readonly string OrderId</code></li>
   <li><code>public string CustomerName { get; }</code></li>
   <li><code>public Dictionary&lt;string, int&gt; Items { get; }</code> (name → quantity)</li>
   <li><code>public decimal Total { get; set; }</code></li>
   <li><code>public List&lt;string&gt; ProcessingLog { get; }</code></li></ul></li>
<li>Create <code>ICheckoutStep</code> with <code>string StepName { get; }</code> and <code>Task&lt;bool&gt; ProcessAsync(Order order)</code></li>
<li>Implement <code>PricingStep</code> (calculates total from fixed prices using Dictionary), <code>PaymentStep</code> (simulates payment — always succeeds), <code>ShippingStep</code> (logs shipping info)</li>
<li>Create <code>CheckoutPipeline</code>: takes <code>List&lt;ICheckoutStep&gt;</code>, runs them in sequence with <code>await</code>, stops on first failure, logs each step in <code>order.ProcessingLog</code></li>
</ol>`,
    hint: "In CheckoutPipeline.RunAsync(), foreach through steps, await each one. If ProcessAsync returns false, add a failure log to order.ProcessingLog and return false immediately. readonly OrderId can be set in the constructor using a GUID: Guid.NewGuid().ToString(\"N\")[..8].",
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// 1. Order class (readonly OrderId, Dictionary items, List log)
// 2. ICheckoutStep interface
// 3. PricingStep, PaymentStep, ShippingStep
// 4. CheckoutPipeline

public class Demo
{
    public static async Task RunAsync()
    {
        await Task.CompletedTask;
    }
}`,
    answer: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class Order
{
    public readonly string OrderId;
    public string CustomerName { get; }
    public Dictionary<string, int> Items { get; } = new Dictionary<string, int>();
    public decimal Total { get; set; }
    public List<string> ProcessingLog { get; } = new List<string>();

    public Order(string customerName)
    {
        OrderId = Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        CustomerName = customerName;
    }

    public void AddItem(string name, int qty) => Items[name] = qty;
}

public interface ICheckoutStep
{
    string StepName { get; }
    Task<bool> ProcessAsync(Order order);
}

public class PricingStep : ICheckoutStep
{
    private Dictionary<string, decimal> _prices = new Dictionary<string, decimal>
    {
        ["Apple"] = 0.99m, ["Bread"] = 2.49m, ["Milk"] = 3.99m, ["Coffee"] = 12.99m
    };

    public string StepName => "Pricing";

    public Task<bool> ProcessAsync(Order order)
    {
        decimal total = 0;
        foreach (var item in order.Items)
            if (_prices.TryGetValue(item.Key, out decimal price))
                total += price * item.Value;
        order.Total = total;
        order.ProcessingLog.Add($"Total calculated: ${total:F2}");
        return Task.FromResult(true);
    }
}

public class PaymentStep : ICheckoutStep
{
    public string StepName => "Payment";

    public async Task<bool> ProcessAsync(Order order)
    {
        await Task.Delay(100); // simulate payment API
        order.ProcessingLog.Add($"Payment of ${order.Total:F2} authorized");
        return true;
    }
}

public class ShippingStep : ICheckoutStep
{
    public string StepName => "Shipping";

    public async Task<bool> ProcessAsync(Order order)
    {
        await Task.Delay(50);
        order.ProcessingLog.Add($"Shipment scheduled for {order.CustomerName}");
        return true;
    }
}

public class CheckoutPipeline
{
    private List<ICheckoutStep> _steps;

    public CheckoutPipeline(List<ICheckoutStep> steps) => _steps = steps;

    public async Task<bool> RunAsync(Order order)
    {
        foreach (ICheckoutStep step in _steps)
        {
            Console.WriteLine($"Running step: {step.StepName}");
            bool success = await step.ProcessAsync(order);
            if (!success)
            {
                order.ProcessingLog.Add($"FAILED at step: {step.StepName}");
                return false;
            }
        }
        return true;
    }
}

public class Demo
{
    public static async Task RunAsync()
    {
        Order order = new Order("Alice Johnson");
        order.AddItem("Apple", 4);
        order.AddItem("Coffee", 2);
        order.AddItem("Bread", 1);

        CheckoutPipeline pipeline = new CheckoutPipeline(new List<ICheckoutStep>
        {
            new PricingStep(),
            new PaymentStep(),
            new ShippingStep()
        });

        bool success = await pipeline.RunAsync(order);

        Console.WriteLine($"\nOrder {order.OrderId} — {(success ? "COMPLETED" : "FAILED")}");
        Console.WriteLine("Processing log:");
        foreach (string log in order.ProcessingLog)
            Console.WriteLine($"  • {log}");
    }
}`
  }
];
